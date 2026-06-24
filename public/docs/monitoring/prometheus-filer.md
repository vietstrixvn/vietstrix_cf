# 🔍 Prometheus Query Helper — Vietstrix

> Truy cập Prometheus tại: [http://localhost:9090](http://localhost:9090)

---

## ⚡ Recording Rules (Fast!)

**Total Request Rate**

```
vietstrix:http_requests:rate5m:total
```

**Request Rate by Status**

```
vietstrix:http_requests:rate5m:by_status
```

**Error Rate (5xx) %**

```
vietstrix:http_requests:error_rate5m:percent
```

**P95 Response Time**

```
vietstrix:http_request_duration:p95
```

**P99 Response Time**

```
vietstrix:http_request_duration:p99
```

**Cache Hit Rate %**

```
vietstrix:redis_cache:hit_rate:percent
```

---

## 📊 HTTP Metrics

**Total Requests**

```
sum(http_requests_total)
```

**Requests by Status Code**

```
sum(http_requests_total) by (status)
```

**Requests by Property**

```
sum(http_requests_total) by (property_id)
```

**Request Rate (5m)**

```
sum(rate(http_requests_total[5m]))
```

**5xx Error Rate**

```
sum(rate(http_requests_total{status=~"5.."}[5m]))
```

**Error Percentage**

```
sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100
```

---

## ⏱️ Response Time

**P50 (Median)**

```
histogram_quantile(0.50, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
```

**P95**

```
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
```

**P99**

```
histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket[5m])) by (le))
```

**Average Response Time**

```
sum(rate(http_request_duration_seconds_sum[5m])) / sum(rate(http_request_duration_seconds_count[5m]))
```

---

## 💾 Database

**Active Connections**

```
db_connections_active
```

**Query Rate**

```
sum(rate(db_queries_total[5m]))
```

**Query Rate by Operation**

```
sum(rate(db_queries_total[5m])) by (operation)
```

---

## 🔴 Redis

**Cache Hit Rate %**

```
sum(rate(redis_cache_hits_total[5m])) / (sum(rate(redis_cache_hits_total[5m])) + sum(rate(redis_cache_misses_total[5m]))) * 100
```

**Operations Rate**

```
sum(rate(redis_operations_total[5m])) by (operation)
```

---

## 🖥️ System Resources

**Goroutines**

```
go_goroutines{job="vietstrix-backend"}
```

**Memory Allocated**

```
go_memstats_alloc_bytes{job="vietstrix-backend"}
```

**Memory Usage %**

```
(go_memstats_alloc_bytes{job="vietstrix-backend"} / go_memstats_sys_bytes{job="vietstrix-backend"}) * 100
```

---

## 🔝 Top N Queries

**Top 10 Slowest Endpoints**

```
topk(10, histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, path)))
```

**Top 10 Most Requested Endpoints**

```
topk(10, sum(rate(http_requests_total[5m])) by (path))
```

**Top 10 Endpoints with Most Errors**

```
topk(10, sum(rate(http_requests_total{status=~"5.."}[5m])) by (path))
```

---

## 🚨 Service Health

**All Services Status**

```
up
```

**Backend Status**

```
up{job="vietstrix-backend"}
```

**All Vietstrix Services**

```
up{job=~"vietstrix.*"}
```
