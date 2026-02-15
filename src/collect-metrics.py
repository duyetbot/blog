#!/usr/bin/env python3
"""
Real metrics collector for duyetbot dashboard.
Calls OpenClaw Gateway API to fetch actual metrics instead of fake data.
"""

import json
import subprocess
from datetime import datetime
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data"
OUTPUT_DIR = BASE_DIR / "build"
TEMPLATES_DIR = BASE_DIR / "src" / "templates"

# OpenClaw Gateway configuration
GATEWAY_URL = "http://localhost:18789"
GATEWAY_TOKEN = "CHANGE_ME"  # Should be set by OpenClaw or environment


def collect_metrics():
    """Collect real metrics from OpenClaw Gateway API."""
    
    try:
        # Use curl to fetch metrics from OpenClaw Gateway
        cmd = [
            "curl", "-s", "-H", 
            f"Authorization: Bearer {GATEWAY_TOKEN}",
            "-H", "Content-Type: application/json",
            f"{GATEWAY_URL}/api/v1/metrics"
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
        
        if result.returncode == 0:
            metrics = json.loads(result.stdout)
            return metrics
        else:
            print(f"Error fetching metrics: {result.stderr}")
            return None
            
    except Exception as e:
        print(f"Failed to collect metrics: {e}")
        return None


def get_cron_status():
    """Fetch cronjob status from OpenClaw Gateway."""
    
    try:
        cmd = [
            "curl", "-s", "-H",
            f"Authorization: Bearer {GATEWAY_TOKEN}",
            "-H", "Content-Type: application/json",
            f"{GATEWAY_URL}/api/v1/cron/list"
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
        
        if result.returncode == 0:
            cronjobs = json.loads(result.stdout)
            return cronjobs
        else:
            print(f"Error fetching cronjobs: {result.stderr}")
            return None
            
    except Exception as e:
        print(f"Failed to collect cronjobs: {e}")
        return None


def get_agent_status():
    """Fetch agent status from OpenClaw Gateway."""
    
    try:
        cmd = [
            "curl", "-s", "-H",
            f"Authorization: Bearer {GATEWAY_TOKEN}",
            "-H", "Content-Type: application/json",
            f"{GATEWAY_URL}/api/v1/agents/list"
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=10)
        
        if result.returncode == 0:
            agents = json.loads(result.stdout)
            return agents
        else:
            print(f"Error fetching agents: {result.stderr}")
            return None
            
    except Exception as e:
        print(f"Failed to collect agents: {e}")
        return None


def generate_dashboard_content():
    """Generate dashboard content with real metrics."""
    
    # Fetch real data
    metrics = collect_metrics()
    cronjobs = get_cron_status()
    agents = get_agent_status()
    
    # If we can't fetch real data, use fallback status
    if not metrics:
        metrics = {
            "gateway_status": "unknown",
            "build_status": "unknown",
            "total_sessions": 0,
            "total_tokens": 0,
            "uptime": "unknown"
        }
    
    # Generate dashboard HTML with real data
    dashboard_html = f"""
    <!-- Header -->
    <header class="dashboard-header">
        <h1>Dashboard</h1>
        <p class="tagline">Control center for duyetbot</p>
        <p class="last-updated">Last updated: {datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC")}</p>
    </header>

    <!-- Quick Actions -->
    <section class="dashboard-section">
        <h2>Quick Actions</h2>
        <div class="action-grid">
            <a href="#rebuild" class="action-card">
                <div class="action-icon">🔄</div>
                <div class="action-title">Refresh Dashboard</div>
                <div class="action-desc">Reload metrics from OpenClaw</div>
            </a>
            <a href="#logs" class="action-card">
                <div class="action-icon">📋</div>
                <div class="action-title">View Logs</div>
                <div class="action-desc">Check recent activity</div>
            </a>
            <a href="#status" class="action-card">
                <div class="action-icon">💚</div>
                <div class="action-title">Check Status</div>
                <div class="action-desc">Verify system health</div>
            </a>
        </div>
    </section>

    <!-- Real Metrics -->
    <section class="dashboard-section">
        <h2>System Status</h2>
        <div class="status-grid">
            <div class="status-card">
                <div class="status-header">
                    <span class="status-icon">✓</span>
                    <span class="status-title">OpenClaw Gateway</span>
                </div>
                <div class="status-value">{metrics.get('gateway_status', 'unknown')}</div>
            </div>
            <div class="status-card">
                <div class="status-header">
                    <span class="status-icon">✓</span>
                    <span class="status-title">Build Status</span>
                </div>
                <div class="status-value">{metrics.get('build_status', 'unknown')}</div>
            </div>
            <div class="status-card">
                <div class="status-header">
                    <span class="status-icon">📊</span>
                    <span class="status-title">Total Sessions</span>
                </div>
                <div class="status-value">{metrics.get('total_sessions', 0)}</div>
            </div>
            <div class="status-card">
                <div class="status-header">
                    <span class="status-icon">📊</span>
                    <span class="status-title">Total Tokens</span>
                </div>
                <div class="status-value">{metrics.get('total_tokens', 0)}</div>
            </div>
            <div class="status-card">
                <div class="status-header">
                    <span class="status-icon">⏱</span>
                    <span class="status-title">Uptime</span>
                </div>
                <div class="status-value">{metrics.get('uptime', 'unknown')}</div>
            </div>
        </div>
    </section>

    <!-- Cron Jobs -->
    <section class="dashboard-section">
        <h2>Cron Jobs</h2>
        <div class="cron-list">
"""
    
    # Add cronjob entries if available
    if cronjobs and cronjobs.get('jobs'):
        for job in cronjobs['jobs'][:5]:  # Show last 5
            status_icon = "✓" if job.get('state') == "ok" else "⚠"
            status_class = "ok" if job.get('state') == "ok" else "error"
            
            dashboard_html += f"""
            <div class="cron-row {status_class}">
                <div class="cron-status"><span class="cron-icon">{status_icon}</span></div>
                <div class="cron-name">{job.get('name', job.get('id'))}</div>
                <div class="cron-time">{job.get('nextRunAt', 'TBD')}</div>
                <div class="cron-summary">{job.get('payload', {}).get('kind', '')}</div>
            </div>
"""
    
    dashboard_html += """
        </div>
    </section>

    <!-- Active Agents -->
    <section class="dashboard-section">
        <h2>Active Agents</h2>
        <div class="agents-grid">
"""
    
    # Add agent entries if available
    if agents and agents.get('agents'):
        for agent in agents['agents'][:3]:  # Show top 3
            agent_id = agent.get('id', 'unknown')
            agent_model = agent.get('model', 'unknown')
            agent_status = agent.get('state', 'unknown')
            
            dashboard_html += f"""
            <div class="agent-card {agent_status}">
                <div class="agent-header">
                    <div class="agent-name">{agent_id}</div>
                    <div class="agent-badge">{agent_status}</div>
                </div>
                <div class="agent-meta">
                    <div class="meta-item">
                        <span class="meta-label">Model:</span>
                        <span class="meta-value">{agent_model}</span>
                    </div>
                </div>
                <div class="agent-status">
                    <div class="status-text">Agent {agent_status}</div>
                </div>
            </div>
"""
    
    dashboard_html += """
        </div>
    </section>

    <!-- Recent Activity -->
    <section class="dashboard-section">
        <h2>Recent Activity</h2>
        <div class="activity-list">
            <div class="activity-item">
                <div class="activity-icon">📊</div>
                <div class="activity-content">
                    <div class="activity-title">Dashboard Updated</div>
                    <div class="activity-time">Just now</div>
                    <div class="activity-desc">Fetched fresh metrics from OpenClaw Gateway</div>
                </div>
            </div>
        </div>
    </section>
    """
    
    return dashboard_html


if __name__ == "__main__":
    print("Collecting real metrics from OpenClaw...")
    
    # Generate dashboard content
    content = generate_dashboard_content()
    
    # Write to data file
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    metrics_file = DATA_DIR / "metrics.json"
    metrics_file.write_text(json.dumps({
        "collected_at": datetime.now().isoformat(),
        "metrics": collect_metrics() or {},
        "cronjobs": get_cron_status() or {},
        "agents": get_agent_status() or {}
    }, indent=2))
    
    print(f"Metrics saved to {metrics_file}")
    
    # Write dashboard HTML snippet
    dashboard_snippet = DATA_DIR / "dashboard-content.html"
    dashboard_snippet.write_text(content)
    
    print(f"Dashboard content saved to {dashboard_snippet}")
    print("Done!")
