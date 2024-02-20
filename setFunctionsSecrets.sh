#!/bin/bash

env_vars=("MANGOPAY_CLIENT_ID" "MANGOPAY_API_KEY" "MANGOPAY_ENDPOINT" "DATABASE_URL" "BREVO_API_KEY")

for env_name in "${env_vars[@]}"
do
    echo "${!env_name}" | firebase functions:secrets:set $env_name &
done

wait