
code ./front 
code ./back

docker start windr-dev-db

cd ./front && npm run dev && cd ..& 
cd ./back && npm run dev&

#  to kill fuser -k 3000/tcp
#  to kill fuser -k 1337/tcp

