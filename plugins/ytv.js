// YT MP3 DOWNLOAD COMMAND 

const { cmd } = require('../command')
const yts = require('yt-search')
const { fetchJson } = require('../lib/functions')

const apilink = 'https://dark-yasiya-api-new.vercel.app' // API LINK ( DO NOT CHANGE THIS!! )

cmd({
    pattern: "song",
    alias: ["yta","play","ytmp3"],
    desc: "download songs.",
    category: "download",
    react: "🎧",
    filename: __filename
},
async(conn, mek, m,{from, reply, q}) => {
try{

if(!q) return reply('Give me song name or url !')
    
const search = await fetchJson(`${apilink}/search/yt?q=${q}`)
const data = search.result.data[0];
const url = data.url
    
const ytdl = await fetchJson(`${apilink}/download/ytmp3?url=${data.url}`)
    
let message = `‎‎
╭═══🎶❃ *SILENT-SOBX-MD-MUSIC-DOWNLOADER* ❃🎶═══⊷
┃❃╭──────────────
┃❃│🎵 ‎TITLE: ${data.title}
┃❃│ ⏱ DURATION: ${data.timestamp}
┃❃│🌏 UPLOADED: ${data.ago}
┃❃│🧿 VIEWS: ${data.views}
┃❃│🤵 AUTHOR: ${data.author.name}
┃❃│📎 URL: ${data.url}
┃❃╰───────────────
╰═════════════════⊷
> © ᴄʀᴇᴀᴛᴇᴅ ʙʏ sɪʟᴇɴᴛʟᴏᴠᴇʀ⁴³² 👩‍💻

> ↺ |◁   II   ▷|   ♡
`
  
await conn.sendMessage(from, { image: { url : data.thumbnail }, caption: message }, { quoted : mek })
  
// SEND AUDIO NORMAL TYPE and DOCUMENT TYPE
await conn.sendMessage(from, { audio: { url: ytdl.result.dl_link }, mimetype: "audio/mpeg" }, { quoted: mek })
await conn.sendMessage(from, { document: { url: ytdl.result.dl_link }, mimetype: "audio/mpeg", fileName: data.title + ".mp3", caption: `*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ sɪʟᴇɴᴛʟᴏᴠᴇʀ···⁴³²* 👩‍💻`}, { quoted: mek })
  
} catch(e){
console.log(e)
reply(e)
}
})

// YT MP4 DOWNLOAD COMMAND 

cmd({
    pattern: "ytmp4",
    desc: "Download YouTube videos as MP4.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a YouTube URL or title.");

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
🎥 *MP4 Download Found!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎬 *Enjoy the video brought to you by Queen Anju Bot!* 

🔽 *To download send:*

*Video File* 🎶
   1.1 *360*
   1.2 *480*
   1.3 *720*
   1.4 *1080*
 *Document File* 📂
   2.1 *360*
   2.2 *480*
   2.3 *720*
   2.4 *1080*

> *Created with ❤️ by Janith Rashmika* 

> *© 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝘽𝙊𝙏 - MD*  
*💻 GitHub:* github.com/Mrrashmika/Queen_Anju-MD
`;
let info = `
🎥 *MP4 Download Found!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎬 *Enjoy the video brought to you by Queen Anju Bot!* 
`

// Send the initial message and store the message ID
const sentMsg = await conn.sendMessage(from, {
    image: { url: data.thumbnail}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
    caption: desc,
    contextInfo: {
        mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
        groupMentions: [],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363299978149557@newsletter',
            newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
            serverMessageId: 999
        },
        externalAdReply: {
            title: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
            body: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
            mediaType: 1,
            sourceUrl: "https://github.com/Mrrashmika",
            thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
            renderLargerThumbnail: false,
            showAdAttribution: true
        }
    }
  });
const messageID = sentMsg.key.id; // Save the message ID for later reference


// Listen for the user's response
conn.ev.on('messages.upsert', async (messageUpdate) => {
    const mek = messageUpdate.messages[0];
    if (!mek.message) return;
    const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
    const from = mek.key.remoteJid;
    const sender = mek.key.participant || mek.key.remoteJid;

    // Check if the message is a reply to the previously sent message
    const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

    if (isReplyToSentMsg) {
        // React to the user's reply (the "1" or "2" message)
        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
        

        if (messageType === '1.1') {
            const down = await ytmp4(`${url}`,"360p")                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info,
                contextInfo: {
                    mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                    groupMentions: [],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363299978149557@newsletter',
                        newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
                        serverMessageId: 999
                    },
                    externalAdReply: {
                        title: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                        body: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                        mediaType: 1,
                        sourceUrl: "https://github.com/Mrrashmika",
                        thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
              });
        }else if (messageType === '1.2') {
            const down = await ytmp4(`${url}`,`480`)                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info,
                contextInfo: {
                    mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                    groupMentions: [],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363299978149557@newsletter',
                        newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
                        serverMessageId: 999
                    },
                    externalAdReply: {
                        title: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                        body: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                        mediaType: 1,
                        sourceUrl: "https://github.com/Mrrashmika",
                        thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
              });
        }else if (messageType === '1.3') {
            const down = await ytmp4(`${url}`,`720`)                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info,
                contextInfo: {
                    mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                    groupMentions: [],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363299978149557@newsletter',
                        newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
                        serverMessageId: 999
                    },
                    externalAdReply: {
                        title: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                        body: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                        mediaType: 1,
                        sourceUrl: "https://github.com/Mrrashmika",
                        thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
              });
        }else if (messageType === '1.4') {
            const down = await ytmp4(`${url}`,`1080`)                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            await conn.sendMessage(from, {
                video: { url: downloadUrl}, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                caption: info,
                contextInfo: {
                    mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                    groupMentions: [],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363299978149557@newsletter',
                        newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
                        serverMessageId: 999
                    },
                    externalAdReply: {
                        title: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                        body: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                        mediaType: 1,
                        sourceUrl: "https://github.com/Mrrashmika",
                        thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                        renderLargerThumbnail: false,
                        showAdAttribution: true
                    }
                }
              });
        }else if (messageType === '2.1') {
            const down = await ytmp4(`${url}`,`360`)                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            // Handle option 2 (Document File)
            await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info,
                        contextInfo: {
                            mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                            groupMentions: [],
                            forwardingScore: 999,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363299978149557@newsletter',
                                newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
                                serverMessageId: 999
                            },
                            externalAdReply: {
                                title: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                                body: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                                mediaType: 1,
                                sourceUrl: "https://github.com/Mrrashmika",
                                thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                      });
        }else if (messageType === '2.2') {
            const down = await ytmp4(`${url}`,`480`)                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            // Handle option 2 (Document File)
            await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info,
                        contextInfo: {
                            mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                            groupMentions: [],
                            forwardingScore: 999,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363299978149557@newsletter',
                                newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
                                serverMessageId: 999
                            },
                            externalAdReply: {
                                title: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                                body: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                                mediaType: 1,
                                sourceUrl: "https://github.com/Mrrashmika",
                                thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                      });
        }else if (messageType === '2.3') {
            const down = await ytmp4(`${url}`,`720`)                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            // Handle option 2 (Document File)
            await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info,
                        contextInfo: {
                            mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                            groupMentions: [],
                            forwardingScore: 999,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363299978149557@newsletter',
                                newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
                                serverMessageId: 999
                            },
                            externalAdReply: {
                                title: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                                body: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                                mediaType: 1,
                                sourceUrl: "https://github.com/Mrrashmika",
                                thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                      });
        }else if (messageType === '2.4') {
            const down = await ytmp4(`${url}`,`1080`)                     
            const downloadUrl = down;
            // React to the upload (sending the file)
            await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
            // Handle option 1 (Audio File)
            // Handle option 2 (Document File)
            await conn.sendMessage(from, {
                        document: { url: downloadUrl},
                        mimetype: "video/mp4",
                        fileName: `${data.title}.mp4`, // Ensure `img.allmenu` is a valid image URL or base64 encoded image
                        caption: info,
                        contextInfo: {
                            mentionedJid: ['94717775628@s.whatsapp.net'], // specify mentioned JID(s) if any
                            groupMentions: [],
                            forwardingScore: 999,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363299978149557@newsletter',
                                newsletterName: "𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃",
                                serverMessageId: 999
                            },
                            externalAdReply: {
                                title: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                                body: '𝐐𝐔𝐄𝐄𝐍 𝐀𝐍𝐉𝐔 𝐌𝐃',
                                mediaType: 1,
                                sourceUrl: "https://github.com/Mrrashmika",
                                thumbnailUrl: 'https://raw.githubusercontent.com/Niko-AND-Janiya/ANJU-DATA/refs/heads/main/LOGOS/6152181515400889311.jpg', // This should match the image URL provided above
                                renderLargerThumbnail: false,
                                showAdAttribution: true
                            }
                        }
                      });} 

        // React to the successful completion of the task
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

        console.log("Response sent successfully");
    }
});

} catch (e) {
console.log(e);
reply(`${e}`);
}
});
