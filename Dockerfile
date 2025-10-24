# 1. Build Stage
# Use the .NET 6 SDK image as the base
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Install Node.js and the C++/Python build tools needed by node-gyp
RUN apt-get update && \
    apt-get install -y gnupg curl build-essential python3 && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    NODE_MAJOR=20 && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /src

# Copy all the source code into the /src directory
COPY . .

# Run dotnet publish
RUN dotnet publish -c Release -o /app /p:PASSCORE_PROVIDER=LDAP

# 2. Final Stage
# Use the smaller ASP.NET runtime image for the final container
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app ./
EXPOSE 80
ENTRYPOINT ["dotnet", "Unosquare.PassCore.Web.dll"]