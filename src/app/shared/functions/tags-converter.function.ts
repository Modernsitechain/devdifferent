import { TagType } from '@enums';

export const getTagsValue = (tags: TagType[]): string => {
  let newTags: string[] = [];

  tags.map((tag: TagType) => {
    newTags.push(capitalizeTag(tag));
  });

  if (newTags.length !== 0) {
    return newTags.join(', ');
  }

  return '';
};

export const generateSearchKeyByTags = (tags: TagType[] | null): string => {
  if (tags !== null) {
    const newTagsValue = tags.map((tag) => {
      switch (tag) {
        case TagType.STIMULUS_PROCESSING:
          return 'stimulus processing,stimulus,processing,prikkelverwerking';

        case TagType.SLEEP:
          return 'sleep,slaap';

        case TagType.SELF_ESTEEM:
          return 'self esteem,self,esteem,eigenwaarde';

        case TagType.ADDICTION:
          return 'addiction,verslaving';

        case TagType.RESILIENCE:
          return 'resilence,weerbaarheid';

        case TagType.FOCUS:
          return 'focus';

        case TagType.EMOTION:
          return 'emotion,emotie';

        case TagType.LIFESTYLES:
          return 'lifestyles,levensstijl';

        case TagType.EXECUTIVE_FUNCTIONS:
          return 'executive,functions,executive functions,executieve,functies,executieve functies';

        case TagType.PSYCHOLOGICAL_PROBLEMS:
          return 'psychological,problems,psychological problems,psychische,problematiek,psychische problematiek';

        case TagType.STRESS:
          return 'stress';

        case TagType.EMOTIONS_AND_AFFECTION:
          return 'emotions,affection,emotions and affection, emotions affection,emoties,affectie,emoties en affectie,emoties affectie';

        case TagType.EMOTIONAL_PROCESSING:
          return 'emotional, processing, emotional processing, emotionele, verwerking, emotionele verwerking';

        case TagType.PERSONALITY:
          return 'personality, persoonlijkheid';

        case TagType.SELF_HARM:
          return 'self, harm, self harm, Zelfbeschadiging';

        default:
          return '';
      }
    });

    return newTagsValue.join(',');
  } else {
    return '';
  }
};

const capitalizeTag = (tag: TagType): string => {
  switch (tag) {
    case TagType.EMOTION:
      return 'Emotion';
    case TagType.FOCUS:
      return 'Focus';
    case TagType.LIFESTYLES:
      return 'Lifestyle';
    case TagType.SELF_ESTEEM:
      return 'Self Esteem';
    case TagType.SLEEP:
      return 'Sleep';
    case TagType.STIMULUS_PROCESSING:
      return 'Stimulus Processing';
    case TagType.ADDICTION:
      return 'Addiction';
    case TagType.RESILIENCE:
      return 'Resilience';
    case TagType.EXECUTIVE_FUNCTIONS:
      return 'Executive Functions';
    case TagType.PSYCHOLOGICAL_PROBLEMS:
      return 'Psychological Problems';
    case TagType.STRESS:
      return 'Stress';
    case TagType.EMOTIONS_AND_AFFECTION:
      return 'Emotions and Affection';
    case TagType.EMOTIONAL_PROCESSING:
      return 'Emotional Processing';
    case TagType.PERSONALITY:
      return 'Personality';
    case TagType.SELF_HARM:
      return 'Self Harm';

    default:
      return tag;
  }
};
