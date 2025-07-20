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
      }
    ];
  }
];