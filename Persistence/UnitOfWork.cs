using System.Threading.Tasks;
using vegaApp.models;

namespace vegaApp.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VegaContext context;

        public UnitOfWork(VegaContext context)
        {
            this.context = context;
        }

        public async  Task CompleteAsync()
        {
           await context.SaveChangesAsync();
        }
    }
}
