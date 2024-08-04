<h2 align="center">Adios Slack-Chatbot : <img height="32px" width="32px" src="./asset/slack_bot_image1-resized.jpg" /> </h2>      

<img src="./asset/Screenshot 2024-07-15 161916.png" align="center" />

> Adios: Hey, I'm Adios, glad to make your acquaintance. Ask me about anime, dogs, anything you like... also I use arch btw ✌️peace.
#### Demo:       
https://github.com/user-attachments/assets/479ac597-1e1d-4a01-84f4-074a70710f56           
      
### Installation :   
--- 
#### Create your Slack-bot:    
1. Visit [slack website](https://slack.com/intl/en-in/) , signin, create a new workspace, in which we will install our chatbot later.
2. Follow the instructions, and create channels for your workspace.     
3. To create your slackbot, visit [slack api website](https://api.slack.com/apps), and click on ` create new app `.   
4. Then click on ` from scratch ` and give your slack bot a name and choose workspace you newly created.    
5. Once this is done you should be directed at **Basic information** page.
6. Go to ` OAuth and Permissions ` section and set ` Scopes ` : These scopes set what your bot can access and its permissions.    
You need to add the following scopes to your bot:    
    i.      app_mentions:read     
    ii.     commands         
    iii.    im:write         
    iv.     im:read          
    v.      chat:write          
    vi.     groups:read           
    vii.    groups:history         
    viii.   channels:history          
    ix.     im:history        
    x.      user.profile:read          
    xi.     mpim:history          
    xii.    mpim:read           
7. Then go to ` Install app ` and click on ` install to workspace ` button to add to your workspace.     
8. Once you are done then, go to ` Basic information ` then to ` App creentials` then copy and note ` signing secret ` , and then navigate to ` Install app ` and copy and note ` Bot User oAuth Token `.    
9. Then scroll down, in ` App-level Token ` create your token, give it a name and add ` connections:write ` , ` authorizations:read ` scopes to it.
10. Then click on ` Generate Tokens and Scopes ` and copy/note the generated token.
11. Go to ` Socket Mode ` in settings and enable ` socket mode ` .     
12. Then under features, go to ` Event Subscriptions ` , toggle on the ` Event Enable ` , then scroll down and click on the ` Subscribe to bot events ` and add the following events:      
    i.      message.channel    
    ii.     message.groups    
    iii.    message.im
    iv.     message.mpim    
    for more info visit [https://api.slack.com/legacy/oauth-scopes](https://api.slack.com/legacy/oauth-scopes) .     
13. Now go to ` App Home ` under features, set your bot display name and username, scroll down and toggle on ` Messages Tab ` and tick the checkbox below it.     
---
#### Setup the server for your slackbot:    
1. Before moving forward, visit [https://mdb.ai/](https://mdb.ai/) , and signup and copy/note your mindsdb api key.   
2. Now fork this repo, then git clone it locally to your computer.    
3. Open the repo in your code editor.
4. Now copy the contents from ` .env.example ` , then create a new ` .env ` and paste the content in it.    
5. Place the respective credentials you obtained in point [8], [9] and [10], in ` .env ` file.    
6. Open the terminal in the cloned repo.
7. Run the following commands in order:   
``` sh
npm i
npm start
```     
> Note: For this project you need to have nodejs installed in your system.

Now you should be able to add your chatbot in your channels in the workspace you created and chat with it!       
### Tech stack used:   
1. Nodejs for backend.    
2. OpenAI sdk for llama-3-70b model integration powered by Mindsdb.
3. Boltjs for slackbot development. Visit [https://slack.dev/bolt-js/tutorial/getting-started](https://slack.dev/bolt-js/tutorial/getting-started) for more information.   
---
### For Contribution:
> Feel free to contribute and reach out if needed.
1. Fork the repo, make the contribution in a separate branch, raise PR and done!      
2. Do 🌟 the repo to show support.          
---
[Twitter](https://x.com/Ayush_Sharma60) | [LinkedIn](https://www.linkedin.com/in/ayush--sharma)    
  









