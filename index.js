require("dotenv").config();
const { App } = require("@slack/bolt");
const OpenAI = require("openai");
const fs = require('fs');

const AI_MODEL = "gemma-7b";
const AI_API_KEY = process.env.AI_API_KEY;

const app = new App({
  token: process.env.SLACK_BOT_OAUTH_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_TOKEN,
});

const AI_CLIENT = new OpenAI({
  apiKey: AI_API_KEY,
  baseURL: process.env.BASE_URL,
});

const promptTemplate = fs.readFileSync('./prompt.md', 'utf-8');

const getPostContent = async (PROMPT) => {
  const chatCompletion = await AI_CLIENT.chat.completions.create({
    messages: [{ role: "user", content: PROMPT }],
    model: AI_MODEL,
  });
  const content = chatCompletion.choices[0]?.message?.content ?? "";
  console.log(
    `the content from ai is::: \n ${content}`
  );
  return content;
};

// ------------------------messages to reply to, here !--------------------------------//

app.message(/adios||Adios/, async ({ event, message, say }) => {
  try {
    const contentToShow = await getPostContent(`${(promptTemplate || process.env.TEMPLATE)+"{"+message.text+"}"}`).catch((e) => {
      console.log(`the error in getting content from contentToShow is: ${e}`);
    });
    const contentToShowActually = contentToShow?.toString().trim();
    if(contentToShowActually.length == ""){
      await say("Thank you for talking to Adios!")
      return;
    }
    await say({
        text:contentToShowActually,
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": contentToShowActually
                    }
                }
            ]
    });

  } catch (error) {
    console.log("err");
    console.error(error);
  }
});

// This will match any message that contains 👋
app.message(":wave:", async ({ message, say }) => {
  // Handle only newly posted messages here
  if (
    message.subtype === undefined ||
    message.subtype === "bot_message" ||
    message.subtype === "file_share" ||
    message.subtype === "thread_broadcast"
  ) {
    await say(`Hello, <@${message.user}>`);
  }
});

(async () => {
  const port = 3008;
  await app.start(process.env.PORT || port);
  console.log("Bolt app started!! at port: ", process.env.PORT);
})();
