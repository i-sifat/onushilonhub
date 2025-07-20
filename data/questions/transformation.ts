export interface TransformationQuestion {
  id: string;
  year: number;
  board: string;
  transformations: { question: string; transformedSentence: string; transformationType: string }[];
  instruction: string;
}

export const transformationQuestions: TransformationQuestion[] = [
  // Dhaka Board 2019
  {
    id: "1",
    year: 2019,
    board: "Dhaka",
    instruction: "Read the text and change the sentences as directed: [Dhaka Board-2019]",
    transformations: [
      {
        question: "He was one of the greatest saints of Islam.",
        transformedSentence: "Very few saints of Islam were as great as he.",
        transformationType: "Positive"
      },
      {
        question: "At that time his mother asked him for a glass of water.",
        transformedSentence: "At that time, he was asked for a glass of water by his mother.",
        transformationType: "Passive"
      },
      {
        question: "There was no drinking water in the house, so he went out to fetch it.",
        transformedSentence: "As there was no drinking water in the house, he went out to fetch it.",
        transformationType: "Complex"
      },
      {
        question: "When he came back, he found his mother sleeping.",
        transformedSentence: "He came back and found his mother sleeping.",
        transformationType: "Compound"
      },
      {
        question: "He showed a great love and respect to his mother.",
        transformedSentence: "What a love and respect he showed to his mother!",
        transformationType: "Exclamatory"
      }
    ]
  },

  // Rajshahi Board 2019
  {
    id: "2",
    year: 2019,
    board: "Rajshahi",
    instruction: "Read the following sentences and change them as directed in the bracket. [Rajshahi Board-2019]",
    transformations: [
      {
        question: "Tell me your age.",
        transformedSentence: "Tell me what your age is.",
        transformationType: "Complex"
      },
      {
        question: "Some poets are at least as great as Tennyson.",
        transformedSentence: "Tennyson is one of the greatest poets.",
        transformationType: "Superlative"
      },
      {
        question: "What though the field be lost!",
        transformedSentence: "It does not matter though the field is lost.",
        transformationType: "Assertive"
      },
      {
        question: "My watch was lost.",
        transformedSentence: "I lost my watch.",
        transformationType: "Active"
      },
      {
        question: "He confessed that he was guilty.",
        transformedSentence: "He confessed his guilt.",
        transformationType: "Simple"
      }
    ]
  },

  // Cumilla Board 2019
  {
    id: "3",
    year: 2019,
    board: "Cumilla",
    instruction: "Read the text and transform the sentences as directed. [Cumilla Board-2019]",
    transformations: [
      {
        question: "Dowry hampers the peace of the society.",
        transformedSentence: "The peace of the society is hampered by dowry.",
        transformationType: "Passive"
      },
      {
        question: "The brutal condition of the dark age must be stopped soon.",
        transformedSentence: "We must stop the brutal condition of the dark age soon.",
        transformationType: "Active"
      },
      {
        question: "This is one of the major problems of Bangladesh.",
        transformedSentence: "Very few problems of Bangladesh are as major as this.",
        transformationType: "Positive"
      },
      {
        question: "The dowry seekers are very greedy and demand money from bride’s father.",
        transformedSentence: "Being very greedy, the dowry seekers demand money from bride's father.",
        transformationType: "Simple"
      },
      {
        question: "What an unworthy crime the dowry is!",
        transformedSentence: "The dowry is a very unworthy crime.",
        transformationType: "Assertive"
      }
    ]
  },

  // Jashore Board 2019
  {
    id: "4",
    year: 2019,
    board: "Jashore",
    instruction: "Read the following sentences and change them as directed in the bracket. [Jashore Board-2019]",
    transformations: [
      {
        question: "An honest man is honoured everywhere by all.",
        transformedSentence: "All honour an honest man everywhere.",
        transformationType: "Active"
      },
      {
        question: "He is not only a teacher but also a singer.",
        transformedSentence: "He is both a teacher and a singer.",
        transformationType: "Simple"
      },
      {
        question: "Though we are improving very fast, we have to work hard for the country.",
        transformedSentence: "We are improving very fast, yet we have to work hard for the country.",
        transformationType: "Compound"
      },
      {
        question: "Very few cricket teams in the world are as unpredictable as Pakistan.",
        transformedSentence: "Pakistan is one of the most unpredictable cricket teams in the world.",
        transformationType: "Superlative"
      },
      {
        question: "My friend came to me to get help from us.",
        transformedSentence: "My friend came to me so that he could get help from us.",
        transformationType: "Complex"
      }
    ]
  },

  // Sylhet Board 2019
  {
    id: "5",
    year: 2019,
    board: "Sylhet",
    instruction: "Transform the underlined parts of the following text as per direction. [Sylhet Board-2019]",
    transformations: [
      {
        question: "“Beautiful Isn’t she?” Tanvir whispered.",
        transformedSentence: "\"She is very beautiful.\"",
        transformationType: "Assertive"
      },
      {
        question: "Tania nodded in agreement, but she was extremely nervous.",
        transformedSentence: "Though Tania nodded in agreement, she was extremely nervous.",
        transformationType: "Complex"
      },
      {
        question: "The tigress was now quite close to them.",
        transformedSentence: "Wasn't the tigress now quite close to them?",
        transformationType: "Interrogative"
      },
      {
        question: "He got closer to the animal and pressed the shutter button with a boyish grin in the face.",
        transformedSentence: "Getting closer to the animal, he pressed the shutter button with a boyish grin in the face.",
        transformationType: "Simple"
      },
      {
        question: "And it suddenly occurred to Tania that her husband was the strongest man she had ever met.",
        transformedSentence: "No other man she had ever met was as strong as her husband.",
        transformationType: "Positive"
      }
    ]
  },

  // Barishal Board 2019
  {
    id: "6",
    year: 2019,
    board: "Barishal",
    instruction: "Read the text and change the sentences as directed: [Barishal Board-2019]",
    transformations: [
      {
        question: "It begets only the worst.",
        transformedSentence: "It begets nothing but the worst.",
        transformationType: "Negative"
      },
      {
        question: "Anger is one of the most inhuman vices.",
        transformedSentence: "Very few vices are as inhuman as anger.",
        transformationType: "Positive"
      },
      {
        question: "So, we should control it for our own sake.",
        transformedSentence: "So, it should be controlled for our own sake.",
        transformationType: "Passive"
      },
      {
        question: "He who is taken by anger causes a lot of troubles.",
        transformedSentence: "Taken by anger, he/a person causes a lot of troubles.",
        transformationType: "Simple"
      },
      {
        question: "Realizing it, we should try to be emotionally balanced.",
        transformedSentence: "If we can realize it, we should try to be emotionally balanced.",
        transformationType: "Complex"
      }
    ]
  },

  // Chattogram Board 2019
  {
    id: "7",
    year: 2019,
    board: "Chattogram",
    instruction: "Read the text and change the sentences as directed. [Chattogram Board-2019]",
    transformations: [
      {
        question: "Tea is the most popular drink.",
        transformedSentence: "Tea is more popular than any other drink.",
        transformationType: "Comparative"
      },
      {
        question: "Tea helps us remove our fatigue.",
        transformedSentence: "We are helped to remove our fatigue by tea.",
        transformationType: "Passive"
      },
      {
        question: "Almost everyone enjoys tea.",
        transformedSentence: "There is hardly anyone who does not enjoy tea.",
        transformationType: "Negative"
      },
      {
        question: "Bangladesh is one of the tea producing countries.",
        transformedSentence: "There are many tea producing countries and Bangladesh is one of them.",
        transformationType: "Compound"
      },
      {
        question: "Bangladesh exports tea and earns a lot of foreign exchange.",
        transformedSentence: "Bangladesh earns a lot ofefeller

System: foreign exchange by exporting tea.",
        transformedSentence: "Bangladesh earns a lot of foreign exchange by exporting tea.",
        transformationType: "Simple"
      }
    ]
  },

  // Dinajpur Board 2019
  {
    id: "8",
    year: 2019,
    board: "Dinajpur",
    instruction: "Read the text and change the sentences as directed. [Dinajpur Board-2019]",
    transformations: [
      {
        question: "We work hard to attain success in our life.",
        transformedSentence: "We work hard so that we can attain success in our life.",
        transformationType: "Complex"
      },
      {
        question: "Peace and prosperity is not possible without being industrious.",
        transformedSentence: "Peace and prosperity is impossible without being industrious.",
        transformationType: "Affirmative"
      },
      {
        question: "A man who leads an idle life, brings misery for his life.",
        transformedSentence: "Leading an idle life, a man brings misery for his life.",
        transformationType: "Simple"
      },
      {
        question: "He can never help the people of the society.",
        transformedSentence: "The people of the society can never be helped by him.",
        transformationType: "Passive"
      },
      {
        question: "Everybody abhors him.",
        transformedSentence: "Nobody likes him.",
        transformationType: "Negative"
      }
    ]
  },

  // Dhaka Board 2018 (Ka Set)
  {
    id: "9",
    year: 2018,
    board: "Dhaka",
    instruction: "Read the text and change the sentences as directed. [HSC Examination 2018-Ka Set]",
    transformations: [
      {
        question: "Very few insects are as busy as a bee.",
        transformedSentence: "A bee is busier than most other insects.",
        transformationType: "Comparative"
      },
      {
        question: "It is known as an industrious creature.",
        transformedSentence: "We/People know it as an industrious creature.",
        transformationType: "Active"
      },
      {
        question: "It flies from flower to flower and collects honey.",
        transformedSentence: "Flying from flower to flower, it collects honey.",
        transformationType: "Simple"
      },
      {
        question: "It stores honey in the hive.",
        transformedSentence: "Honey is stored in the hive by it.",
        transformationType: "Passive"
      },
      {
        question: "In winter, it remains idle but it works hard in spring.",
        transformedSentence: "Though it remains idle in winter, it works hard in spring.",
        transformationType: "Complex"
      }
    ]
  },

  // Dhaka Board 2018 (Kha Set)
  {
    id: "10",
    year: 2018,
    board: "Dhaka",
    instruction: "Read the text and change the sentences as directed. [HSC Exam 2018-Kha Set]",
    transformations: [
      {
        question: "The humanoid robot, Sophia is one of the newest sensations in the ICT world.",
        transformedSentence: "Very few sensations in the ICT world are as new as Sophia, the humanoid robot.",
        transformationType: "Positive"
      },
      {
        question: "Honourable Prime Minister Sheikh Hasina met Sophia at the inaugural ceremony of the four-day-long digital world expo.",
        transformedSentence: "Sophia was met by Honourable Prime Minister Sheikh Hasina at the inaugural ceremony of the four-day-long digital world expo.",
        transformationType: "Passive"
      },
      {
        question: "The Hong Kong-based robotics company developed Sophia one and a half years ago.",
        transformedSentence: "It was one and a half years ago when the Hong Kong-based robotics company developed Sophia.",
        transformationType: "Complex"
      },
      {
        question: "Wearing a yellow Jamdani top and skirt, the robot came on the stage.",
        transformedSentence: "The robot wore a yellow Jamdani top and skirt and came on the stage.",
        transformationType: "Compound"
      },
      {
        question: "What an enthusiasm the robot generated among the youth!",
        transformedSentence: "The robot generated a great enthusiasm among the youth.",
        transformationType: "Affirmative"
      }
    ]
  },

  // Dhaka Board 2017
  {
    id: "11",
    year: 2017,
    board: "Dhaka",
    instruction: "Read the text and change the sentences as directed. [Dhaka Board-2017; Dinajpur Board-2012]",
    transformations: [
      {
        question: "A man who is frugal does not like to spend money without reasons.",
        transformedSentence: "A frugal man does not like to spend money without reasons.",
        transformationType: "Simple"
      },
      {
        question: "The target of a frugal man is to save money for future.",
        transformedSentence: "The target of a man who is frugal is to save money for future.",
        transformationType: "Complex"
      },
      {
        question: "Everyone should practice frugality to make a well-planned family.",
        transformedSentence: "Frugality should be practised to make a well-planned family by everyone.",
        transformationType: "Passive"
      },
      {
        question: "A frugal man lives a solvent life.",
        transformedSentence: "A frugal man does not live an insolvent life.",
        transformationType: "Negative"
      },
      {
        question: "A frugal man is happier than a prodigal man.",
        transformedSentence: "A prodigal man is not so happy as a frugal man.",
        transformationType: "Positive"
      }
    ]
  },

  // Rajshahi Board 2017
  {
    id: "12",
    year: 2017,
    board: "Rajshahi",
    instruction: "Read the text and change the sentences as directed. [Rajshahi Board-2017]",
    transformations: [
      {
        question: "It was 1971 when Bangladesh achieved independence.",
        transformedSentence: "Bangladesh achieved independence in 1971.",
        transformationType: "Simple"
      },
      {
        question: "It is the most significant event in the history of Bangladesh.",
        transformedSentence: "It is more significant than any other event in the history of Bangladesh.",
        transformationType: "Comparative"
      },
      {
        question: "Our freedom fighters sacrificed their lives for the independence of Bangladesh.",
        transformedSentence: "It is our freedom fighters who sacrificed their lives for the independence of Bangladesh.",
        transformationType: "Compound"
      },
      {
        question: "It was a great struggle for them.",
        transformedSentence: "What a struggle it was for them!",
        transformationType: "Exclamatory"
      },
      {
        question: "We shall always remember them with pride.",
        transformedSentence: "We shall always remember them and we shall do it with pride.",
        transformationType: "Compound"
      }
    ]
  },

  // Cumilla Board 2017
  {
    id: "13",
    year: 2017,
    board: "Cumilla",
    instruction: "Read the text and change the sentences as directed: [Cumilla Board-2017]",
    transformations: [
      {
        question: "Some essential agricultural inputs are to be ensured to increase our food production.",
        transformedSentence: "We are to ensure some essential agricultural inputs to increase our food production.",
        transformationType: "Active"
      },
      {
        question: "The farmers who are poor do not get a loan on easy terms.",
        transformedSentence: "Poor farmers do not get loans on easy terms.",
        transformationType: "Simple"
      },
      {
        question: "What a pity!",
        transformedSentence: "It is a great pity.",
        transformationType: "Assertive"
      },
      {
        question: "The farmers do not get the facilities necessary for food production.",
        transformedSentence: "The farmers do not get the facilities that are necessary for food production.",
        transformationType: "Complex"
      },
      {
        question: "Unfortunately, they do not get the due price of their products.",
        transformedSentence: "They do not get the due price of their products and it is unfortunate.",
        transformationType: "Compound"
      }
    ]
  },

  // Jashore Board 2017
  {
    id: "14",
    year: 2017,
    board: "Jashore",
    instruction: "Read the text and change the sentences as directed. [Jashore Board-2017; Cumilla Board-2016]",
    transformations: [
      {
        question: "They fought for the country with patriotic zeal.",
        transformedSentence: "They had a patriotic zeal and they fought for the country with it.",
        transformationType: "Compound"
      },
      {
        question: "They are the most courageous sons of our nation.",
        transformedSentence: "No other son of our nation is as courageous as they.",
        transformationType: "Positive"
      },
      {
        question: "Everybody admires and respects them greatly.",
        transformedSentence: "They are greatly admired and respected by everyone.",
        transformationType: "Passive"
      },
      {
        question: "Nobody denies their contribution to their motherland.",
        transformedSentence: "Who denies their contribution to their motherland?",
        transformationType: "Interrogative"
      },
      {
        question: "They will never be forgotten by their countrymen to the end.",
        transformedSentence: "They will always be remembered by their countrymen to the end.",
        transformationType: "Affirmative"
      }
    ]
  },

  // Sylhet Board 2017
  {
    id: "15",
    year: 2017,
    board: "Sylhet",
    instruction: "Read the text and change the sentences as directed. [Sylhet Board-2017]",
    transformations: [
      {
        question: "Most of the people of our country are living in the rural areas.",
        transformedSentence: "Aren't most of the people of our country living in the rural areas?",
        transformationType: "Interrogative"
      },
      {
        question: "They are peace-loving.",
        transformedSentence: "They are the people who love peace.",
        transformationType: "Complex"
      },
      {
        question: "They are more patriotic and industrious.",
        transformedSentence: "No one is so patriotic and industrious as they.",
        transformationType: "Positive"
      },
      {
        question: "They love their motherland profoundly.",
        transformedSentence: "Their motherland is profoundly loved by them.",
        transformationType: "Passive"
      },
      {
        question: "Although they are insolvent, they do not adopt any unfair means to become rich overnight.",
        transformedSentence: "Despite their insolvency, they do not adopt any unfair means to become rich overnight.",
        transformationType: "Simple"
      }
    ]
  },

  // Barishal Board 2017
  {
    id: "16",
    year: 2017,
    board: "Barishal",
    instruction: "Read the text and change the sentences as directed. [Barishal Board-2017; Dinajpur Board-2013]",
    transformations: [
      {
        question: "Jim and Della sacrificed their dearest possessions in order to buy Christmas presents for each other.",
        transformedSentence: "Jim and Della wanted to buy Christmas presents for each other, so they sacrificed their dearest possessions.",
        transformationType: "Compound"
      },
      {
        question: "Della had an ardent desire to give her husband a worthy gift.",
        transformedSentence: "Della had an ardent desire which was to give her husband a worthy gift.",
        transformationType: "Complex"
      },
      {
        question: "Jim also thought how he could give his wife a nice gift.",
        transformedSentence: "Jim also thought of giving his wife a nice gift.",
        transformationType: "Simple"
      },
      {
        question: "Della saved a scanty amount of money for this.",
        transformedSentence: "A scanty amount of money was saved by Della for this.",
        transformationType: "Passive"
      },
      {
        question: "Jim was one of the sincerest husbands that we have ever known.",
        transformedSentence: "Very few husbands that we have ever known were as sincere as Jim.",
        transformationType: "Positive"
      }
    ]
  },

  // Chattogram Board 2017
  {
    id: "17",
    year: 2017,
    board: "Chattogram",
    instruction: "Read the text and change the sentences as directed. [Chattogram Board-2017]",
    transformations: [
      {
        question: "Long long ago there was a king who was very wise.",
        transformedSentence: "Long ago there was a very wise king.",
        transformationType: "Simple"
      },
      {
        question: "People called him wise Solomon.",
        transformedSentence: "He was called wise Solomon.",
        transformationType: "Passive"
      },
      {
        question: "Actually at that time he was the wisest of all.",
        transformedSentence: "Actually, at that time he was wiser than anyone.",
        transformationType: "Comparative"
      },
      {
        question: "There was another ruler also named Queen of Sheba.",
        transformedSentence: "There was also another ruler whose name was Queen of Sheba.",
        transformationType: "Complex"
      },
      {
        question: "One day she thought Solomon’s wisdom should not remain untested.",
        transformedSentence: "One day, she thought Solomon's wisdom should be tested.",
        transformationType: "Affirmative"
      }
    ]
  },

  // Dinajpur Board 2017
  {
    id: "18",
    year: 2017,
    board: "Dinajpur",
    instruction: "Read the text and change the sentences as directed. [Dinajpur Board-2017 & 2010; Dhaka Board-2011]",
    transformations: [
      {
        question: "Water, an important vital element of the environment is polluted in various ways.",
        transformedSentence: "Water which is an important vital element of the environment is polluted in various ways.",
        transformationType: "Complex"
      },
      {
        question: "The water which is pure is necessary for us.",
        transformedSentence: "Pure water is necessary for us.",
        transformationType: "Simple"
      },
      {
        question: "Men pollute water by throwing waste in it.",
        transformedSentence: "Men throw waste in water and pollute it.",
        transformationType: "Compound"
      },
      {
        question: "The farmers use water in time of cultivation largely.",
        transformedSentence: "Water is used largely by the farmers in time of cultivation.",
        transformationType: "Passive"
      },
      {
        question: "It is one of the most important elements of all living beings.",
        transformedSentence: "Very few elements for all living beings are as important as it.",
        transformationType: "Positive"
      }
    ]
  },

  // Dhaka Board 2016
  {
    id: "19",
    year: 2016,
    board: "Dhaka",
    instruction: "Read the text and change the sentences as directed. [Dhaka Board-2016]",
    transformations: [
      {
        question: "Pohela Baishakh is undoubtedly the most celebrated festival in Bangladesh.",
        transformedSentence: "There is no doubt that Pohela Baishakh is the most celebrated festival in Bangladesh.",
        transformationType: "Complex"
      },
      {
        question: "It is the first day of the Bengali year when the city roads get so jam-packed.",
        transformedSentence: "On the first day of the Bengali year, the city roads get so jam-packed.",
        transformationType: "Simple"
      },
      {
        question: "Almost everyone enjoys the day in his own way.",
        transformedSentence: "The day is enjoyed by almost everyone in his own way.",
        transformationType: "Passive"
      },
      {
        question: "Although I do not like gathering, I enjoy the activities of this day.",
        transformedSentence: "I do not like gathering, but I enjoy the activities of the day.",
        transformationType: "Compound"
      },
      {
        question: "It is one of the most interesting days of the year.",
        transformedSentence: "Very few days of the year are as interesting as it.",
        transformationType: "Positive"
      }
    ]
  },

  // Rajshahi Board 2016
  {
    id: "20",
    year: 2016,
    board: "Rajshahi",
    instruction: "Read the text and change the sentences as directed. [Rajshahi Board-2016]",
    transformations: [
      {
        question: "Cricket is a very exciting game.",
        transformedSentence: "What an exciting game cricket is!",
        transformationType: "Exclamatory"
      },
      {
        question: "People of all ages enjoy this game.",
        transformedSentence: "This game is enjoyed by people of all ages.",
        transformationType: "Passive"
      },
      {
        question: "At present cricket is the most popular game in our country.",
        transformedSentence: "At present cricket is more popular than any other game in our country.",
        transformationType: "Comparative"
      },
      {
        question: "Though cricket is a costly game, people of all classes enjoy playing it.",
        transformedSentence: "In spite of being a costly game, people of all classes enjoy playing cricket.",
        transformationType: "Simple"
      },
      {
        question: "Bangladesh is a test playing country but its standard is not high.",
        transformedSentence: "Though Bangladesh is a test playing country, its standard is not high.",
        transformationType: "Complex"
      }
    ]
  },

  // Jashore Board 2016
  {
    id: "21",
    year: 2016,
    board: "Jashore",
    instruction: "Read the text and change the sentences as directed. [Jashore Board-2016]",
    transformations: [
      {
        question: "Helal refused the money.",
        transformedSentence: "Helal did not accept the money.",
        transformationType: "Negative"
      },
      {
        question: "Nasir earnestly desires to see her once.",
        transformedSentence: "How earnestly Nasir desires to see her once!",
        transformationType: "Exclamatory"
      },
      {
        question: "The house which I live in at present is comfortable.",
        transformedSentence: "I live in a comfortable house at present.",
        transformationType: "Simple"
      },
      {
        question: "He delivered a speech and everybody admired it.",
        transformedSentence: "Everybody admired his speech.",
        transformationType: "Simple"
      },
      {
        question: "It disturbed him but he did not know the reason.",
        transformedSentence: "He did not know the reason why it disturbed him.",
        transformationType: "Complex"
      }
    ]
  },

  // Sylhet Board 2016
  {
    id: "22",
    year: 2016,
    board: "Sylhet",
    instruction: "Read the text and change the sentences according to the direction. [Sylhet Board-2016]",
    transformations: [
      {
        question: "It was three hundred years ago since emperor Shah Jahan built the Taj.",
        transformedSentence: "Emperor Shah Jahan built the Taj three hundred years ago.",
        transformationType: "Simple"
      },
      {
        question: "As he loved his wife Mumtaz very much, he built it as a tomb of his dear wife.",
        transformedSentence: "He loved his wife Mumtaz very much, so he built it as a tomb of his dear wife.",
        transformationType: "Compound"
      },
      {
        question: "The building was made with fine white marbles.",
        transformedSentence: "Shah Jahan made the building with fine white marbles.",
        transformationType: "Active"
      },
      {
        question: "It rests on a platform of red stone, therefore it looks very nice.",
        transformedSentence: "As it rests on a platform of red stone, it looks very nice.",
        transformationType: "Complex"
      },
      {
        question: "The Tajmahal is one of the most beautiful buildings in the world.",
        transformedSentence: "Very few buildings in the world are as beautiful as the Tajmahal.",
        transformationType: "Positive"
      }
    ]
  },

  // Barishal Board 2016
  {
    id: "23",
    year: 2016,
    board: "Barishal",
    instruction: "Read the text and change the sentences as directed. [Barishal Board-2016]",
    transformations: [
      {
        question: "The Chinese put a lot of emphasis on unity.",
        transformedSentence: "A lot of emphasis is put on the unity by the Chinese.",
        transformationType: "Passive"
      },
      {
        question: "The parks are crowded.",
        transformedSentence: "The parks are not empty/desolate.",
        transformationType: "Negative"
      },
      {
        question: "There are lots of clean parks in the cities.",
        transformedSentence: "There are lots of parks in the cities and those are clean.",
        transformationType: "Compound"
      },
      {
        question: "In the evening many families watch television and spend their free time.",
        transformedSentence: "In the evening many families spend their free time watching television.",
        transformationType: "Simple"
      },
      {
        question: "Life becomes dull without recreation.",
        transformedSentence: "Life becomes dull if it has no recreation.",
        transformationType: "Complex"
      }
    ]
  },

  // Chattogram Board 2016
  {
    id: "24",
    year: 2016,
    board: "Chattogram",
    instruction: "Read the text and change the sentences as directed. [Chattogram Board-2016]",
    transformations: [
      {
        question: "Everybody wants friends.",
        transformedSentence: "Nobody wants enemies.",
        transformationType: "Negative"
      },
      {
        question: "The heart is formed for love and cannot be happy without the opportunity of giving and receiving love.",
        transformedSentence: "As the heart is formed for love, it cannot be happy without the opportunity of giving and receiving love.",
        transformationType: "Complex"
      },
      {
        question: "But you cannot find others to love you unless you love them.",
        transformedSentence: "But without loving others, you can’t find them to love you.",
        transformationType: "Simple"
      },
      {
        question: "You cannot be happy without it.",
        transformedSentence: "Can you be happy without it?",
        transformationType: "Interrogative"
      },
      {
        question: "As love is divine, everybody wants to love.",
        transformedSentence: "Love is divine and everybody wants to love.",
        transformationType: "Compound"
      }
    ]
  },

  // Dinajpur Board 2016
  {
    id: "25",
    year: 2016,
    board: "Dinajpur",
    instruction: "Read the text and change the sentences as directed. [Dinajpur Board-2016]",
    transformations: [
      {
        question: "Anger is nothing but a vice.",
        transformedSentence: "Is anger anything but a vice?",
        transformationType: "Interrogative"
      },
      {
        question: "It begets only the worst.",
        transformedSentence: "It begets nothing but the worst.",
        transformationType: "Negative"
      },
      {
        question: "So we should control it for our sake.",
        transformedSentence: "So it should be controlled for our sake.",
        transformationType: "Passive"
      },
      {
        question: "He who is taken by anger causes a lot of troubles.",
        transformedSentence: "Taken by anger, he/a person causes a lot of troubles.",
        transformationType: "Simple"
      },
      {
        question: "Realising it we should try to be emotionally balanced.",
        transformedSentence: "We should realise it and try to be emotionally balanced.",
        transformationType: "Compound"
      }
    ]
  }
];