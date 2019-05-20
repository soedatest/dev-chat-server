#### 実行
```bash
node index.js
```
#### Redisは環境汚染回避のためDockerで立ち上げる
```yaml
version: '2'
volumes:
  redis-data:
    driver: local
services:

  redis:
    image: redis:3.2.9
    ports:
      - "6379:6379"
    command: redis-server --requirepass password
    volumes:
       - redis-data:/data
```
```bash
# 起動/確認
docker-compose up -d
docker-compose exec redis bash
redis-cli
AUTH password
ping
```