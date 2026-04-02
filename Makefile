APP_NAME   := dream
PORT       := 3000
IMAGE      := $(APP_NAME):latest
CONTAINER  := $(APP_NAME)

# ── Build ─────────────────────────────────────────────────
.PHONY: build
build: ## Build the Docker image
	docker build -t $(IMAGE) .

.PHONY: build-no-cache
build-no-cache: ## Build without layer cache
	docker build --no-cache -t $(IMAGE) .

# ── Run ───────────────────────────────────────────────────
.PHONY: run
run: ## Run the container (detached)
	docker run -d \
		--name $(CONTAINER) \
		-p $(PORT):3000 \
		--env-file .env.local \
		--restart unless-stopped \
		$(IMAGE)

.PHONY: run-it
run-it: ## Run interactively (foreground, logs visible)
	docker run --rm \
		--name $(CONTAINER) \
		-p $(PORT):3000 \
		--env-file .env.local \
		$(IMAGE)

# ── Stop / Remove ─────────────────────────────────────────
.PHONY: stop
stop: ## Stop the container
	docker stop $(CONTAINER)

.PHONY: rm
rm: stop ## Stop and remove the container
	docker rm $(CONTAINER)

.PHONY: restart
restart: ## Restart the container
	docker restart $(CONTAINER)

# ── Logs ──────────────────────────────────────────────────
.PHONY: logs
logs: ## Tail container logs
	docker logs -f $(CONTAINER)

.PHONY: logs-100
logs-100: ## Show last 100 log lines
	docker logs --tail 100 $(CONTAINER)

# ── Shell / Debug ─────────────────────────────────────────
.PHONY: shell
shell: ## Open a shell inside the running container
	docker exec -it $(CONTAINER) sh

.PHONY: ps
ps: ## Show container status
	docker ps -a --filter name=$(CONTAINER)

.PHONY: health
health: ## Check container health
	@docker inspect --format='{{.State.Health.Status}}' $(CONTAINER) 2>/dev/null || echo "no healthcheck"
	@echo "---"
	@docker inspect --format='{{.State.Status}}' $(CONTAINER)

.PHONY: stats
stats: ## Show CPU/memory usage
	docker stats $(CONTAINER) --no-stream

# ── Image ─────────────────────────────────────────────────
.PHONY: size
size: ## Show image size
	docker images $(APP_NAME)

.PHONY: clean
clean: ## Remove container + image
	-docker rm -f $(CONTAINER) 2>/dev/null
	-docker rmi $(IMAGE) 2>/dev/null

.PHONY: prune
prune: ## Remove dangling images and build cache
	docker image prune -f
	docker builder prune -f

# ── Shortcuts ─────────────────────────────────────────────
.PHONY: up
up: build run ## Build and run in one command

.PHONY: down
down: rm ## Alias for stop + remove

.PHONY: rebuild
rebuild: rm build run ## Full rebuild and restart

# ── Help ──────────────────────────────────────────────────
.PHONY: help
help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
