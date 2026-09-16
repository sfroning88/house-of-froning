#!/usr/bin/env python3
"""
Author: Sean Froning
Created Date: 9.15.2026
Spotify Auth flow for token refresh
"""

import sys
from pathlib import Path

_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(_ROOT / "packages" / "python" / "src"))

import base64
import os
import urllib.parse
import urllib.request
import json

from dotenv import load_dotenv

load_dotenv(_ROOT / ".env")


def get_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        raise EnvironmentError(f"Missing required environment variable: {name}")
    return value


def build_authorize_url(client_id: str, redirect_uri: str, scope: str, state: str) -> str:
    params = {
        "response_type": "code",
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "scope": scope,
        "state": state,
    }
    return f"https://accounts.spotify.com/authorize?{urllib.parse.urlencode(params)}"


def exchange_code(
    client_id: str,
    client_secret: str,
    redirect_uri: str,
    code: str,
) -> dict:
    credentials = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    data = urllib.parse.urlencode({
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri,
    }).encode()

    request = urllib.request.Request(
        "https://accounts.spotify.com/api/token",
        data=data,
        headers={
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": f"Basic {credentials}",
        },
    )

    with urllib.request.urlopen(request) as response:
        return json.loads(response.read().decode())


def refresh_access_token(
    client_id: str,
    client_secret: str,
    refresh_token: str,
) -> dict:
    credentials = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    data = urllib.parse.urlencode({
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
    }).encode()

    request = urllib.request.Request(
        "https://accounts.spotify.com/api/token",
        data=data,
        headers={
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": f"Basic {credentials}",
        },
    )

    with urllib.request.urlopen(request) as response:
        return json.loads(response.read().decode())


def main() -> None:
    client_id = get_env("SPOTIFY_CLIENT_ID")
    client_secret = get_env("SPOTIFY_CLIENT_SECRET")
    redirect_uri = get_env("SPOTIFY_REDIRECT_URI")
    scope = "user-read-recently-played"
    state = "house-of-froning-auth"

    print("Open this URL in your browser to authorize the app:")
    print(build_authorize_url(client_id, redirect_uri, scope, state))
    print()

    code = input("Paste the authorization code from the redirect URL: ").strip()
    if not code:
        print("No code provided. Exiting.")
        return

    tokens = exchange_code(client_id, client_secret, redirect_uri, code)

    print()
    print("access_token:")
    print(tokens.get("access_token", ""))
    print()
    print("refresh_token:")
    print(tokens.get("refresh_token", ""))


if __name__ == "__main__":
    main()
