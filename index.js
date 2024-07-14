require("dotenv").config();
const { App } = require("@slack/bolt");
const OpenAI = require("openai");

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

// app.message(async ({ message, say }) => {
//   console.log("Received message:", message);

//   // Respond to the message
//   await say(`You said: ${message.text}`);
// });


console.log(process.env.TEMPLATE);

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
//   /^(hello adios||hey adios||hi adios)\s+.*$/
app.message(/adios||Adios/, async ({ message, say }) => {
  try {
    const contentToShow = await getPostContent(`${process.env.TEMPLATE+message.text}`).catch((e) => {
      console.log(`the error in getting content from contentToShow is: ${e}`);
    });
    const contentToShowActually = contentToShow?.toString().trim();
    // await say(`${contentToShowActually}`);
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

app.message("hola", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey there <@${message.user}>!`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me",
          },
          action_id: "button_click",
        },
      },
    ],
    text: `Hey there <@${message.user}>!`,
  });
});

app.action("button_click", async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
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
