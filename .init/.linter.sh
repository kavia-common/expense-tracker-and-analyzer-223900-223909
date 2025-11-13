#!/bin/bash
cd /home/kavia/workspace/code-generation/expense-tracker-and-analyzer-223900-223909/frontend_expense_tracker
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

