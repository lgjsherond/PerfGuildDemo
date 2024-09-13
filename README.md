# PerfGuildDemo
Demo purpose Only

Build
To build a custom k6 binary with this extension, first ensure you have the prerequisites:

- Go toolchain
- Git

Download xk6:
```
go install go.k6.io/xk6/cmd/xk6@latest
```

Build the k6 binary:
```
xk6 build --with github.com/grafana/xk6-kubernetes
```
