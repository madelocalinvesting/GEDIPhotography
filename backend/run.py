import os
import subprocess
import sys
from pathlib import Path


def get_venv_python(venv_dir: Path) -> Path:
    if sys.platform == "win32":
        return venv_dir / "Scripts" / "python.exe"
    return venv_dir / "bin" / "python"


def ensure_venv_and_deps() -> Path:
    backend_dir = Path(__file__).resolve().parent
    venv_dir = backend_dir / ".venv"
    venv_python = get_venv_python(venv_dir)

    if not venv_python.exists():
        print("[backend] Creating virtual environment...")
        subprocess.check_call([sys.executable, "-m", "venv", str(venv_dir)])

    print("[backend] Ensuring dependencies are installed...")
    requirements = backend_dir / "requirements.txt"
    subprocess.check_call([str(venv_python), "-m", "pip", "install", "--upgrade", "pip"])
    subprocess.check_call([str(venv_python), "-m", "pip", "install", "-r", str(requirements)])
    return venv_python


def run_uvicorn(venv_python: Path):
    backend_dir = Path(__file__).resolve().parent
    app_module = "app.main:app"
    env = os.environ.copy()
    print("[backend] Starting Uvicorn on http://localhost:8000 ...")
    subprocess.check_call(
        [str(venv_python), "-m", "uvicorn", app_module, "--reload", "--host", "0.0.0.0", "--port", "8000"],
        cwd=str(backend_dir),
        env=env,
    )


def main():
    venv_python = ensure_venv_and_deps()
    run_uvicorn(venv_python)


if __name__ == "__main__":
    main()

