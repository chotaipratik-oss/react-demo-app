using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System;
using System.Threading.Tasks;

namespace react_demo_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GraphTokenController : ControllerBase
    {
        [HttpGet("token")]
        public async Task<IActionResult> GetToken([FromQuery] string clientId, [FromQuery] string clientSecret, [FromQuery] string tenantId)
        {
            if (string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(clientSecret) || string.IsNullOrEmpty(tenantId))
            {
                return BadRequest("Missing required parameters.");
            }

            string[] scopes = new[] { "https://graph.microsoft.com/.default" };

            var app = ConfidentialClientApplicationBuilder.Create(clientId)
                .WithClientSecret(clientSecret)
                .WithAuthority(new Uri($"https://login.microsoftonline.com/{tenantId}"))
                .Build();

            var result = await app.AcquireTokenForClient(scopes).ExecuteAsync();
            string accessToken = result.AccessToken;

            return Ok(new { accessToken });
        }
    }
}
