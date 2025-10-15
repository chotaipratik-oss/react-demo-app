using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace react_demo_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GraphAuthController : ControllerBase
    {
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()

        {
            System.Diagnostics.Debugger.Break();
            string tenantId = "a3b09b39-59ab-407c-ad97-dbecca421780";
            string clientId = "caac7aff-dcda-438d-95a5-c625e090e551";
            string clientSecret = "fQK8Q~bEtER9DCEE0edCCZIfvpPYaOaeLb3DfaI3";
            string[] scopes = new[] { "https://graph.microsoft.com/.default" };

            var app = ConfidentialClientApplicationBuilder.Create(clientId)
                .WithClientSecret(clientSecret)
                .WithAuthority(new Uri($"https://login.microsoftonline.com/{tenantId}"))
                .Build();

            var result = await app.AcquireTokenForClient(scopes).ExecuteAsync();
            string accessToken = result.AccessToken;

            using var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var response = await httpClient.GetAsync("https://graph.microsoft.com/v1.0/users");
            var content = await response.Content.ReadAsStringAsync();

            // Deserialize to strongly-typed User list
            var users = System.Text.Json.JsonSerializer.Deserialize<ODataUserResponse>(content)?.Value;
            return Ok(users);
        }
        // Helper class for OData response
        public class ODataUserResponse
        {
            public System.Collections.Generic.List<react_demo_app.Models.User> Value { get; set; }
        }
    }
}

