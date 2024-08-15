using Microsoft.AspNetCore.Mvc;
using Nota.Bl.BussinesLayer;
using Nota.Mvc.Models;
using System.Diagnostics;

namespace Nota.Mvc.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly NotaBl notaBl;

        public HomeController(ILogger<HomeController> logger, NotaBl notaBl)
        {
            _logger = logger;
            this.notaBl = notaBl;
        }

        public async Task<IActionResult> Index()
        {           
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
