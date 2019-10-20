// site.com/api/product_categories

export const productCategories = [
  {
    id: "1",
    keyname: "gift_cards",
    name: "Gift Cards"
  },
  {
    id: "2",
    keyname: "flores",
    name: "Flores"
  }
];

// site.com/api/product_categories/1
export const productCategoriesGiftCards = {
  id: "1",
  keyname: "gift_cards",
  name: "Gift Cards",
  children: [
    {
      id: "1_1",
      keyname: "apps_filmes_series",
      name: "Apps, Filmes e Séries",
      children: [
        {
          id: "1_1_1",
          keyname: "apps_filmes_series",
          name: "Apps, Filmes e Séries",
          children: [
            {
              id: "1_1_1_1",
              keyname: "apps_filmes_series",
              name: "Apps, Filmes e Séries"
            }
          ]
        }
      ]
    },
    {
      id: "1_2",
      keyname: "educacao",
      name: "Educação",
      children: [
        {
          id: "1_2_1",
          keyname: "educacao",
          name: "Educação",
          children: [
            {
              id: "1_2_1_1",
              keyname: "educacao",
              name: "Educação"
            }
          ]
        }
      ]
    },
    {
      id: "1_3",
      keyname: "games",
      name: "Games",
      children: [
        {
          id: "1_3_1",
          keyname: "jogos_e_plataformas",
          name: "Jogos & Plataformas",
          children: [
            {
              id: "1_3_1_1",
              keyname: "blizzard",
              name: "Blizzard"
            },
            {
              id: "1_3_1_2",
              keyname: "imvp",
              name: "IMVP"
            },
            {
              id: "1_3_1_3",
              keyname: "league_of_legends",
              name: "League Of Legends"
            },
            {
              id: "1_3_1_4",
              keyname: "level_up",
              name: "Level Up"
            }
          ]
        }
      ]
    }
  ]
};

export const productCategoriesFlores = {
  id: "2",
  keyname: "flores",
  name: "Flores",
  children: [
    {
      id: "2_1",
      keyname: "flores_1",
      name: "Flores 1",
      children: [
        {
          id: "2_1_1",
          keyname: "flores_1",
          name: "Flores 1",
          children: [
            {
              id: "2_1_1_1",
              keyname: "flores_1",
              name: "Flores 1"
            }
          ]
        }
      ]
    },
    {
      id: "2_2",
      keyname: "flores_2",
      name: "Flores 2",
      children: [
        {
          id: "2_2_1",
          keyname: "flores_2",
          name: "Flores 2",
          children: [
            {
              id: "2_2_1_1",
              keyname: "flores_2",
              name: "Flores 2"
            }
          ]
        }
      ]
    },
    {
      id: "2_3",
      keyname: "flores_3",
      name: "Flores 3",
      children: [
        {
          id: "2_3_1",
          keyname: "jogos_e_plataformas",
          name: "Jogos & Plataformas",
          children: [
            {
              id: "2_3_1_1",
              keyname: "blizzard",
              name: "Blizzard"
            },
            {
              id: "2_3_1_2",
              keyname: "imvp",
              name: "IMVP"
            },
            {
              id: "2_3_1_3",
              keyname: "league_of_legends",
              name: "League Of Legends"
            },
            {
              id: "2_3_1_4",
              keyname: "level_up",
              name: "Level Up"
            }
          ]
        }
      ]
    }
  ]
};
