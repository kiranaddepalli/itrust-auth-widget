# Itrust Authentication Widget
Light-weight embedding of Private ID and Digital Address widget 

# Port configuration
Runs on Port 3005

### Build Docker Image for DEV
```
docker build --tag itrust/itrust-auth-widget . --build-arg BUILD_FOR=dev  
```

### Build Docker Image for PROD
```
docker build --tag itrust/itrust-auth-widget . --build-arg BUILD_FOR=prod   
```

# Install parcel to bundle the widget 
```
npm install -D parcel-bundler
```
