using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using WebApplication2.Models;
using System.Threading.Tasks;
using WebApplication2.Database;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace WebApplication2.Controllers
{

    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountController(UserManager<AppUser> userManager, ApplicationDbContext context, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
        }

        // POST api/Account
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = new AppUser() {

                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                UserName = model.Email

            };

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            return new OkResult();
        }
        // GET: api/Account
        [Authorize]
        [HttpGet]
        public IEnumerable<AppUser> GetUsers()
        {
            return _context.Users.Where(u => u.Id != User.Identity.Name);
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user != null)
            {
                var checkPassword = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
                if (checkPassword.Succeeded)
                {
                    var token = GetToken(user.Id, user.Email);
                    return new OkObjectResult(new { token });
                }
            }

            return NotFound();
        }

        private string GetToken(string userId, string userEmail)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Consts.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claimIdentity = new ClaimsIdentity(new Claim[]
            {
                        new Claim(ClaimTypes.Name, userId),
                        new Claim(ClaimTypes.Email, userEmail),
            });

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = claimIdentity,
                Expires = DateTime.Now.AddMinutes(120),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

    }
}