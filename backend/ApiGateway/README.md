API Gateway Service

This service acts as the entry point for the StockTok backend, routing requests to the appropriate microservices (like the Market Service) using YARP (Yet Another Reverse Proxy).

Prerequisites

.NET 9.0 SDK installed.

How to Run

Navigate to the Gateway folder:
Open your terminal and move to the folder containing ApiGateway.csproj:

cd backend/ApiGateway

Install Dependencies (First Time Only):
If you haven't installed the YARP library yet, run this command to fix the MapReverseProxy error:

dotnet add package Yarp.ReverseProxy

Run the Service:
Start the gateway:

dotnet run

Verify:
Look for the output in the terminal to find the port number (usually 5069 or 5001):

Now listening on: http://localhost:5069

Troubleshooting

"Project not found": Make sure you are inside the folder that has the .csproj file. Use ls to check.

"MapReverseProxy" Error: This means the YARP package is missing. Run step 2 again.

Port Conflicts: If the port is busy, check Properties/launchSettings.json to change it.
