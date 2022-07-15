FROM nginx:latest

# RUN sudo unlink /etc/nginx/sites-available/default

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]