# 📋 Loki Query Helper (LogQL) — Vietstrix

> Truy cập: [Grafana Explore](http://localhost:3001/explore) | [Loki](http://localhost:3100)

**Quick Start:** Copy query bên dưới → Mở Grafana Explore → Chọn datasource "Loki" → Paste và Run query.

---

## 🎯 Most Common Queries

**All Backend Logs**

```
{container="vietstrix_backend"}
```

**Error Logs Only**

```
{container="vietstrix_backend"} |= "ERROR"
```

**500 Errors**

```
{container="vietstrix_backend"} |= "status=500"
```

**HTTP Requests**

```
{container="vietstrix_backend"} |= "HTTP Request"
```

**All Vietstrix Services**

```
{container=~"vietstrix.*"}
```

---

## 🔴 Error Tracking

**All Errors**

```
{container="vietstrix_backend"} |= "ERROR"
```

**Fatal Errors**

```
{container="vietstrix_backend"} |= "FATAL"
```

**Panic Logs**

```
{container="vietstrix_backend"} |= "panic"
```

**5xx Errors**

```
{container="vietstrix_backend"} |~ "status=5.."
```

**Database Errors**

```
{container="vietstrix_backend"} |= "database" |= "error"
```

---

## 🌐 HTTP Request Logs

**All HTTP Requests**

```
{container="vietstrix_backend"} |= "HTTP Request"
```

**POST Requests**

```
{container="vietstrix_backend"} |= "method=POST"
```

**GET Requests**

```
{container="vietstrix_backend"} |= "method=GET"
```

**Slow Requests (>1s)**

```
{container="vietstrix_backend"} |= "latency_ms" |~ "latency_ms=[1-9][0-9]{3,}"
```

**Exclude Health Checks**

```
{container="vietstrix_backend"} != "health" != "metrics"
```

---

## 🔐 Authentication Logs

**Login Attempts**

```
{container="vietstrix_backend"} |= "login"
```

**Failed Logins**

```
{container="vietstrix_backend"} |= "login" |= "failed"
```

**Successful Logins**

```
{container="vietstrix_backend"} |= "login" |= "success"
```

**JWT Errors**

```
{container="vietstrix_backend"} |= "JWT" |= "error"
```

---

## 💾 Database Logs

**Database Queries**

```
{container="vietstrix_backend"} |= "database" |= "query"
```

**Database Errors**

```
{container="vietstrix_backend"} |= "database" |= "error"
```

**Connection Issues**

```
{container="vietstrix_backend"} |= "connection" |= "failed"
```

---

## 📊 Metric Queries

**Error Count (5m)**

```
sum(count_over_time({container="vietstrix_backend"} |= "ERROR" [5m]))
```

**Error Rate**

```
rate({container="vietstrix_backend"} |= "ERROR" [5m])
```

**Request Rate**

```
rate({container="vietstrix_backend"} |= "HTTP Request" [5m])
```

**Total Log Count (5m)**

```
count_over_time({container="vietstrix_backend"}[5m])
```

---

## 🐳 Container Logs

**Backend**

```
{container="vietstrix_backend"}
```

**Database**

```
{container="vietstrix_db"}
```

**Redis**

```
{container="vietstrix_cache"}
```

**Nginx**

```
{container="vietstrix-nginx"}
```

**Prometheus**

```
{container="vietstrix-prometheus"}
```

**Grafana**

```
{container="vietstrix-grafana"}
```

---

## ⏰ Time Ranges

**Last 5 Minutes**

```
{container="vietstrix_backend"}[5m]
```

**Last 1 Hour**

```
{container="vietstrix_backend"}[1h]
```

**Last 24 Hours**

```
{container="vietstrix_backend"}[24h]
```

---

## 🔍 Advanced Queries

**Regex Pattern Match**

```
{container="vietstrix_backend"} |~ "status=[45].."
```

**Case Insensitive Search**

```
{container="vietstrix_backend"} |~ "(?i)error"
```

**Multiple Filters (AND)**

```
{container="vietstrix_backend"} |= "ERROR" |= "database"
```

**Top 10 Error Sources**

```
topk(10, sum by (container_name) (count_over_time({container=~"vietstrix.*"} |= "ERROR" [5m])))
```
