import glenBand from "./images/spinaltap.jpg";
import glenBirthday from "./images/glen_birthday.jpg";
import glenWedding from "./images/glen_stormtrooper.jpg";
import shantiCity from "./images/shanti_seattle.jpg";
import shantiLaw from "./images/shanti_law.jpg";
import shantiGrad from "./images/celebration.jpg";
import kyleShirt from "./images/kyle_alumiman.jpg";
import kyleVegas from "./images/kyle_vegas.jpg";
import kyleBeach from "./images/kyle_beach.jpg";
import lanceDesk from "./images/lance_desk.jpg";
import lanceMom from "./images/lance_mom.jpg";
import lanceDream from "./images/lance_dream.jpg";

export const cases = [
  {
    id: "glen",
    name: "Glen",
    role: "The open book",
    title: "A little too personal.",
    tag: "PERSONAL DETAILS",
    color: "peach",
    icon: "fingerprint",
    level: "Beginner",
    minutes: 3,
    description:
      "A favorite band. A family birthday. A password hiding in plain sight.",
    hint: "Favorite band + oldest brother’s name + age",
    format:
      "Join the three clues, without spaces. Capitalization doesn’t matter in this simulation.",
    answer: "spinaltapderek35",
    intro:
      "Glen shares the good times with everyone. His password hint suggests those memories unlock more than his photo album. Can you connect the dots?",
    clues: [
      { id: "band", label: "Favorite band", value: "Spinal Tap", post: 0 },
      { id: "brother", label: "Oldest brother", value: "Derek", post: 1 },
      { id: "age", label: "Age in the case file", value: "35", post: 1 },
    ],
    posts: [
      {
        image: glenBand,
        platform: "Instagram",
        title: "Front row. All-time favorite.",
        text: "Glen: “I still can’t believe I got to be front row for these guys in 2009 at Glastonbury.” The musician’s shirt reads SPINAL TAP.",
        observations: [
          "Favorite band: Spinal Tap",
          "Favorite band: The Beatles",
          "Favorite band: Queen",
        ],
        correct: 0,
        clueIds: ["band"],
        explanation:
          "The band name is right on the T-shirt. A photo can reveal a fact even when the caption doesn’t name it.",
      },
      {
        image: glenBirthday,
        platform: "Facebook",
        title: "A birthday, and a little extra.",
        text: "Glen remembers his third birthday: “Why was Derek already taller than my dad? He was only 11 years old in that picture!” Grandma comments: “Happy 35th birthday to my youngest grandchild!”",
        observations: [
          "Brother: Derek · age: 35",
          "Brother: Derek · age: 11",
          "Brother: Glen · age: 3",
        ],
        correct: 0,
        clueIds: ["brother", "age"],
        explanation:
          "Derek is the older brother. Grandma reveals Glen’s age at the time of this archived post: 35. Use the case-file age, not today’s date.",
      },
      {
        image: glenWedding,
        platform: "Instagram",
        title: "May the vows be with you.",
        text: "Glen: “I got a chance to officiate my sister’s wedding last week. What an awesome time!” The wedding is in Paris and the groom wears a Stormtrooper costume.",
        observations: [
          "No clue for this password hint",
          "Favorite band: Star Wars",
          "Oldest brother: Paris",
        ],
        correct: 0,
        clueIds: [],
        explanation:
          "Interesting doesn’t always mean relevant. Neither the wedding location nor the costume answers this password hint.",
      },
    ],
    lesson: "A password should never be a biography.",
    takeaway:
      "Names, birthdays, and favorite things are discoverable. Combining them doesn’t make them secret.",
    question: "What is Glen’s strongest next move?",
    options: [
      "Add an exclamation mark to the same password.",
      "Create a long, random, unique password with a password manager.",
      "Hide the birthday post and keep the password.",
    ],
    correct: 1,
    wrong:
      "The exposed password is still predictable. A symbol or a deleted post cannot make a known secret private again.",
    action:
      "Replace passwords based on personal details. Let a password manager generate and remember a unique one for each account.",
  },
  {
    id: "shanti",
    name: "Shanti",
    role: "The rising star",
    title: "Success leaves a trail.",
    tag: "DIGITAL FOOTPRINT",
    color: "lavender",
    icon: "sparkles",
    level: "Intermediate",
    minutes: 3,
    description:
      "Connect a city break and a career milestone. Read between the posts.",
    hint: "Favorite city + degree abbreviation + graduation year",
    format:
      "Join the clues without spaces. The degree has two letters. Capitalization doesn’t matter.",
    answer: "seattlejd2021",
    intro:
      "Shanti is proud of her career, and rightly so. Across three platforms, her public milestones also spell out her password.",
    clues: [
      { id: "city", label: "Favorite city", value: "Seattle", post: 0 },
      { id: "degree", label: "Degree", value: "JD", post: 1 },
      { id: "year", label: "Graduation year", value: "2021", post: 2 },
    ],
    posts: [
      {
        image: shantiCity,
        platform: "Facebook",
        title: "Back in my favorite city.",
        text: "Shanti checks in at the Space Needle: “Back in the best city in the USA! I missed the food and the ocean. Heading to the gum wall and a Mariners game this afternoon!”",
        observations: [
          "Favorite city: Portland",
          "Favorite city: Seattle",
          "Favorite city: Chicago",
        ],
        correct: 1,
        clueIds: ["city"],
        explanation:
          "The Space Needle, gum wall, and Mariners point to Seattle. The check-in makes the location explicit.",
      },
      {
        image: shantiLaw,
        platform: "Stories",
        title: "One exam away.",
        text: "Shanti posts a photo from a library: “Only three more days until I take the bar exam!” A law degree in this case is a Juris Doctor, abbreviated JD.",
        observations: ["Degree: MBA", "Degree: MD", "Degree: JD"],
        correct: 2,
        clueIds: ["degree"],
        explanation:
          "A Juris Doctor is abbreviated JD. The bar-exam post links Shanti’s career to that degree.",
      },
      {
        image: shantiGrad,
        platform: "TikTok",
        title: "A milestone worth sharing.",
        text: "A graduation cap and gavel. Shanti’s caption reads: “And 5 years later she became a lawyer. #JDin2021. #attorneyshanti, #hardwork, #studentdebt!”",
        observations: [
          "Graduation year: 2021",
          "Graduation year: 2016",
          "Graduation year: 2026",
        ],
        correct: 0,
        clueIds: ["year"],
        explanation:
          "The hashtag gives the exact graduation year: 2021. Details from separate platforms can be joined together.",
      },
    ],
    lesson: "Separate posts. One complete picture.",
    takeaway:
      "Information across different profiles can be combined. A professional milestone is public information, not a safe password ingredient.",
    question:
      "Shanti used this password for email and a shopping account. What should she do?",
    options: [
      "Change it everywhere it was reused, using a different password for each account.",
      "Change only the shopping password.",
      "Make every account use the same new password.",
    ],
    correct: 0,
    wrong:
      "Reusing a password lets one exposed account put other accounts at risk. Every affected account needs its own new password.",
    action:
      "Check for password reuse. Give every account a distinct password, especially your email account.",
  },
  {
    id: "kyle",
    name: "Kyle",
    role: "The anonymous one",
    title: "Hidden name. Open clues.",
    tag: "FALSE ANONYMITY",
    color: "mint",
    icon: "eye",
    level: "Intermediate",
    minutes: 2,
    description:
      "An anonymous handle doesn’t hide a very recognizable pattern.",
    hint: "Ultimate superhero + lucky number",
    format:
      "Use the superhero’s name as printed on the shirt, followed by the number. No spaces.",
    answer: "alumiman18",
    intro:
      "Kyle thinks an anonymous handle keeps his online life private. His favorite things tell a different story.",
    clues: [
      { id: "hero", label: "Favorite superhero", value: "Alumiman", post: 0 },
      { id: "number", label: "Lucky number", value: "18", post: 1 },
    ],
    posts: [
      {
        image: kyleShirt,
        platform: "Instagram",
        title: "Not exactly a secret identity.",
        text: "Anonymous_Kyle: “Found this beauty at the mall today. I’m definitely wearing it to the office on Monday!” The shirt reads ALUMIMAN. The hashtag is #alumimanrocks.",
        observations: [
          "Superhero: Iron Man",
          "Superhero: Alumiman",
          "Superhero: Batman",
        ],
        correct: 1,
        clueIds: ["hero"],
        explanation:
          "The fictional superhero’s name is Alumiman. Both the shirt and the hashtag reveal the same preference.",
      },
      {
        image: kyleVegas,
        platform: "Facebook",
        title: "What happens in Vegas…",
        text: "Kyle posts a casino photo with the hashtags #highroller, #LuckyNumber18, and #WhatHappensHereStaysHere.",
        observations: [
          "Lucky number: 18",
          "Lucky number: 3",
          "Lucky number: 19",
        ],
        correct: 0,
        clueIds: ["number"],
        explanation:
          "The hashtag explicitly gives away 18. A private-sounding caption doesn’t limit who can read a public post.",
      },
      {
        image: kyleBeach,
        platform: "Facebook",
        title: "A day away from the screen.",
        text: "Kyle shares a beach vacation photo. There is no superhero name or lucky number in this post.",
        observations: [
          "Lucky number: 7",
          "Superhero: Aquaman",
          "No clue for this password hint",
        ],
        correct: 2,
        clueIds: [],
        explanation:
          "This post doesn’t resolve either part of the hint. Good investigators distinguish evidence from assumptions.",
      },
    ],
    lesson: "A hidden name is not a security control.",
    takeaway:
      "Aliases don’t make your interests secret. Even a unique password needs a second layer of protection.",
    question: "What adds protection if Kyle’s password is exposed?",
    options: [
      "Switch to a different anonymous username.",
      "Add another favorite character to the password.",
      "Turn on multifactor authentication (MFA).",
    ],
    correct: 2,
    wrong:
      "An alias or another guessable word won’t add a separate sign-in check. MFA adds another factor beyond the password.",
    action:
      "Turn on MFA, especially for email and work accounts. Use a phishing-resistant option, such as a security key or passkey, when available.",
  },
  {
    id: "lance",
    name: "Lance",
    role: "The accidental insider",
    title: "It’s in the background.",
    tag: "WORKPLACE EXPOSURE",
    color: "yellow",
    icon: "scan",
    level: "Advanced",
    minutes: 4,
    description:
      "One desk photo. One tiny detail. A much bigger security problem.",
    hint: "Miami expo date (MMDDYY) + company Wi-Fi password",
    format:
      "Use six digits for the date, then the five-character Wi-Fi code. No spaces. Capitalization doesn’t matter here.",
    answer: "0421225azx4",
    intro:
      "Lance’s new desk setup is picture-perfect. Unfortunately, a note in the background and a framed souvenir expose exactly what the password hint asks for.",
    clues: [
      { id: "date", label: "Expo date", value: "042122", post: 0 },
      { id: "wifi", label: "Exposed Wi-Fi code", value: "5AZX4", post: 1 },
    ],
    posts: [
      {
        image: lanceMom,
        platform: "Instagram",
        title: "A souvenir with a date.",
        text: "A framed “Ceramic Dog Expo in Miami in 2022” photo has a note from Mom: “Best birthday ever! Love, Mom 04/21/22.” Lance thanks her for the trip to the Miami expo.",
        observations: [
          "Expo date: 011423",
          "Expo date: 042122",
          "Expo date: 042123",
        ],
        correct: 1,
        clueIds: ["date"],
        explanation:
          "The handwritten date is April 21, 2022. In the case’s MMDDYY format, that is 042122.",
      },
      {
        image: lanceDesk,
        platform: "Social feed",
        title: "The setup gives it away.",
        text: "Lance shows off his dual monitors and then a close-up of his new company headshot. A pink sticky note behind it says “WIFI: 5AZX4”.",
        observations: [
          "Wi-Fi code: 1971",
          "Wi-Fi code: 042122",
          "Wi-Fi code: 5AZX4",
        ],
        correct: 2,
        clueIds: ["wifi"],
        explanation:
          "The close-up exposes the code 5AZX4. Screens, badges, whiteboards, and sticky notes all deserve a check before you share.",
      },
      {
        image: lanceDream,
        platform: "Social feed",
        title: "A beach full of puppies.",
        text: "Lance imagines a Miami beach covered with ceramic puppies. The post is dated January 14, 2023, but describes an earlier convention.",
        observations: [
          "Expo date: 011423",
          "No new clue for this password hint",
          "Wi-Fi code: PUPPY",
        ],
        correct: 1,
        clueIds: [],
        explanation:
          "The upload date is not the event date. Use the date on the souvenir, not the timestamp of this later post.",
      },
    ],
    lesson: "The background can become the breach.",
    takeaway:
      "A harmless photo can expose a workplace secret. Removing the picture is only part of the response.",
    question: "What should Lance do about the exposed work credential?",
    options: [
      "Delete the photo and assume the problem is fixed.",
      "Tell the IT/security team promptly so they can rotate the exposed credential, then remove the image.",
      "Move the sticky note to a different monitor.",
    ],
    correct: 1,
    wrong:
      "Someone may already have saved the photo. The responsible team needs to know so the exposed credential can be changed.",
    action:
      "Scan images before posting. If a work secret is exposed, report it promptly and follow your organization’s incident process.",
  },
];
export const playbook = [
  {
    icon: "fingerprint",
    title: "Your life isn’t a password.",
    text: "Skip names, birthdays, hobbies, and other discoverable details.",
  },
  {
    icon: "key",
    title: "Long. Random. Unique.",
    text: "Use a password manager to create and store a different strong password for every account.",
  },
  {
    icon: "shield",
    title: "Give your password backup.",
    text: "Enable MFA. Choose a phishing-resistant option, such as a security key or passkey, where available.",
  },
  {
    icon: "scan",
    title: "Check before you share.",
    text: "Look for credentials, badges, screens, and private information in the background of a photo.",
  },
];
