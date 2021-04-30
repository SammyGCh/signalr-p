using Microsoft.AspNetCore.SignalR;

using System.Threading.Tasks;

namespace SignalRPrueba.Hubs
{
    public class Chat : Hub
    {
        public async Task SendMessage(string sender, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", sender, message);
        }

        public async Task JoinGroup(string group, string user){
            await Groups.AddToGroupAsync(Context.ConnectionId, group);
           // await SendMessageToGroup(group, "Admin", $"se unió {user}");
            await Clients.Group(group).SendAsync("ReceiveMessage", "Admin", $"se unió {user} al grupo {group}");
        }

        public Task SendMessageToGroup(string groupName, string sender, string message)
        {
            return Clients.Group(groupName).SendAsync("ReceiveMessage", sender, message);
        }
    }
}