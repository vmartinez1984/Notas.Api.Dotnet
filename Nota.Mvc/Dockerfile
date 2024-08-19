#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Nota.Mvc/Nota.Mvc.csproj", "Nota.Mvc/"]
COPY ["Nota.Bl/Nota.Bl.csproj", "Nota.Bl/"]
RUN dotnet restore "./Nota.Mvc/Nota.Mvc.csproj"
COPY . .
WORKDIR "/src/Nota.Mvc"
RUN dotnet build "./Nota.Mvc.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Nota.Mvc.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Nota.Mvc.dll"]