## Build

```bash
docker build . -t gcr.io/inothy-firebase/inothy:latest
docker push gcr.io/inothy-firebase/inothy:latest
```

## Corsx

```bash
gsutil cors set cors.json gs://inothy-testing
```
