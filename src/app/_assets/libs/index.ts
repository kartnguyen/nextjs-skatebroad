export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function formattedPrice(price: number | undefined) {
  return price?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export const user = [
  {
    id: 1,
    name: "Cody Fisher",
    job: "fitness trainer",
    avatar: "/users/avatar_1.jpg",
    content:
      "In mattis scelerisque magna, ut tincidunt ex. Quisque nibh urna, pretium in tristique in, bibendum sed libero.",
    rated: 5,
  },
  {
    id: 2,
    name: "Sander Biass",
    job: "Street art skateboarder",
    avatar: "/users/avatar_2.png",
    content:
      "Quisque a ante massa. Donec molestie varius dui nec ornare. Morbi iaculis consequat tempus. Curabitur at est mollis, ultrices dolor vitae, scelerisque augue.",
    rated: 4,
  },
  {
    id: 3,
    name: "De Luna",
    job: "professional billiard",
    avatar: "/users/avatar_3.png",
    content:
      "Pellentesque mauris nunc, pretium non erat non, finibus tristique dui. Ut sed sem orci. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    rated: 5,
  },
  {
    id: 4,
    name: "Jahmer Boss",
    job: "athletes",
    avatar: "/users/avatar_4.png",
    content:
      "I cant believe how much nicer the materials are compared to other AJ1 i have. Leather is super buttery. Insoles need to better might take em out for better ones.",
    rated: 4,
  },
];

export const items = [
  {
    label: "Default Sorting",
    key: "1",
  },
  {
    label: "Alphabetically, A-Z",
    key: "2",
  },
  {
    label: "Price, low to high",
    key: "3",
  },
  {
    label: "Price, high to low",
    key: "4",
  },
];
