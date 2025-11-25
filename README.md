# Cloud-Based Task Automation Platform

**Stack**
- Frontend: React
- Backend: Django + Django REST Framework (local dev with SQLite)
- Serverless: AWS Lambda (Python) for scheduled orchestration and notifications
- Storage & DB in Cloud: S3 (artifacts), DynamoDB (cloud task store) — local dev uses SQLite and localstack (optional)

This repository is a scaffold to run locally and deploy to AWS. It includes:
- `frontend/` — React app to create & list tasks
- `backend/` — Django project with REST APIs (tasks app)
- `aws/` — AWS SAM template + Lambda function handlers for scheduler and notifier
- `README.md` — this file (you are reading it)

## Quick local setup (development)

### Backend (Django)
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```
API endpoints:
- `GET /api/tasks/` — list tasks
- `POST /api/tasks/` — create a task (JSON: name, schedule_time (ISO), payload)
- `GET /api/tasks/<id>/` — task details
- `PATCH /api/tasks/<id>/` — update status

### Frontend (React)
```bash
cd frontend
npm install
npm start
```
By default the frontend expects backend at `http://localhost:8000`.

### AWS / Serverless (outline)
The `aws/` folder contains a SAM template to deploy two Lambda functions:
- `TaskScheduler` — periodically invoked (CloudWatch Events / EventBridge) to fetch due tasks and trigger execution
- `TaskNotifier` — sends notifications (example via SNS/email). For simplicity includes a stub.

The Lambda handlers are in `aws/lambdas/`. They assume tasks are stored in DynamoDB in production; local testing will be against the Django REST API.

## Deploying to AWS (high level)
1. Install and configure AWS CLI & SAM CLI.
2. Package and deploy:
```bash
cd aws
sam build
sam deploy --guided
```
3. Configure environment variables and IAM roles as described in the template.

## Notes
- This scaffold focuses on structure and key integration points. For production you must:
  - Add authentication (Cognito / API Gateway JWT)
  - Harden Lambda IAM roles (least privilege)
  - Add robust retry and dead-letter handling for async tasks
  - Replace local SQLite with DynamoDB / RDS as appropriate

Enjoy! — Generated scaffold
