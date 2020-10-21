initn:
	docker network create docker-network

initv:
	docker volume create db.data

up-db:
	docker-compose -f ./docker-compose.db.yml up -d

down-db:
	docker-compose -f ./docker-compose.db.yml down