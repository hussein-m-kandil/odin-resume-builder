import { initialData } from "./data/initialData";
import { appDefaults } from "./appDefaults";
import { appColors } from "./appColors";
import Head from "./components/Head";
import Line from "./components/Line";
import Date from "./components/Date";
import List from "./components/List";
import SubHead from "./components/SubHead";
import Paragraph from "./components/Paragraph";

export const initialEntriesData = [
  {
    component: Line,
    props: {
      initialText: initialData.name,
      initialStyle: {
        fontSize: "xx-large",
        fontWeight: "bold",
        color: appColors.dark,
      },
    },
  },
  {
    component: Line,
    props: {
      initialText: initialData.title,
      initialStyle: {
        fontSize: "x-large",
        color: appColors.accent,
      },
    },
  },
  ...(() => {
    const entries = [];
    initialData.contact.forEach((entry, i, arr) => {
      entries.push({
        component: Line,
        props: {
          initialText: entry,
          initialStyle: {
            color: appColors.mid,
            marginBottom:
              i === arr.length - 1
                ? appDefaults.bigMarginBottom
                : appDefaults.marginBottom,
          },
        },
      });
    });
    return entries;
  })(),
  {
    component: Head,
    props: {
      initialText: "SKILLS",
    },
  },
  {
    component: Paragraph,
    props: {
      initialText: initialData.skills,
    },
  },
  {
    component: Head,
    props: {
      initialText: "EXPERIENCE",
    },
  },
  ...(() => {
    const entries = [];
    initialData.experience.forEach((entry) => {
      entries.push(
        {
          component: SubHead,
          props: {
            initialText: entry.org,
            initialExtensionText: entry.title,
          },
        },
        { component: Date },
        {
          component: List,
          props: {
            initialListItems: entry.details,
          },
        }
      );
    });
    return entries;
  })(),
  {
    component: Head,
    props: {
      initialText: "EDUCATION",
    },
  },
  ...(() => {
    const entries = [];
    initialData.education.forEach((entry) => {
      entries.push(
        {
          component: SubHead,
          props: {
            initialText: entry.org,
            initialExtensionText: entry.deg,
          },
        },
        { component: Date },
        {
          component: Paragraph,
          props: {
            initialText: entry.about,
          },
        }
      );
    });
    return entries;
  })(),
  {
    component: Head,
    props: {
      initialText: "AWARDS",
    },
  },
  {
    component: List,
    props: {
      initialListItems: initialData.awards,
    },
  },
];
