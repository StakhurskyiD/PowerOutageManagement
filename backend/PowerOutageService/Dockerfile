# Use the SDK image for building the application
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Install PostgreSQL client tools
RUN apt-get update && apt-get install -y postgresql-client

# Copy the .csproj file and restore dependencies
COPY ["backend/PowerOutageService/PowerOutageService.csproj", "PowerOutageService/"]
RUN dotnet restore "PowerOutageService/PowerOutageService.csproj"

# Install the latest compatible dotnet-ef tool for running migrations
RUN dotnet tool install --global dotnet-ef --version 7.0.15

# Ensure the dotnet tools path is available
ENV PATH="$PATH:/root/.dotnet/tools"

# Copy all other files and build the application
COPY backend/PowerOutageService/ PowerOutageService/
WORKDIR "/src/PowerOutageService"
RUN dotnet build "PowerOutageService.csproj" -c Release -o /app/build

# Create a new migration (replace 'InitialCreate' with your desired migration name)
#RUN dotnet ef migrations add SimplifyAndUpdateDatabaseLogic

# Publish the application
FROM build AS publish
RUN dotnet publish "PowerOutageService.csproj" -c Release -o /app/publish /p:UseAppHost=false

# EF Core Migration Stage
FROM build AS efcore
WORKDIR /src/PowerOutageService

# Ensure PostgreSQL client is installed
RUN apt-get update && apt-get install -y postgresql-client

# Run migrations
ENTRYPOINT ["sh", "-c", "until pg_isready -h postgres -p 5432; do echo waiting for postgres; sleep 2; done; dotnet ef database update"]

# Use the ASP.NET Core runtime image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Run the application
ENTRYPOINT ["dotnet", "PowerOutageService.dll"]