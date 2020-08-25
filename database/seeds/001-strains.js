
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('strains').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('strains').insert([
        
        {
          "strain": "Zoom-Pie",
          "type": "indica",
          "rating": 4.6,
          "effects": "Hungry,Relaxed,Uplifted,Happy,Sleepy",
          "flavor": "Berry,Earthy,Pungent",
          "description": "Zoom Pie (also known as Zombie Pie) is a heavy indica-dominant strain that blends the potency of Blue Zombie with the flavor and color of Cherry Pie. This combination yields blue and purple foliage that reeks of tart cherries and pungent skunky fuel. It is known to stimulate appetite while imbuing the consumer with a heady euphoria (presumably from the recessive African landrace, Durban Poison, nestled in Cherry Pie). Enjoy this strain as a means to crush stress, physical discomfort, and depression. But be aware, this strain will apply sedative effects to the body when dosed heavily. This strain was bred by Tank aka gansettfinest of NICE LLC."
        },
        {
          'effects': "Creative",
          'flavor': "Earthy,Citrus",
          'description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
          
          'strain': "200 OG",
          'rating': 4,
          'type': "Hybrid",
          
      },
      {
        'effects': "Happy",
        'flavor':"Herbal,Pine",
        'description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        
        'strain': "100 OG",
        'rating': 4.6,
        'type': "Hybrid",
        
    },
    {
      'effects': "Euphoric",
      'flavor': "Earthy,Citrus",
      'description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
     
      'strain': "GrandDaddy Purple",
      'rating': 4.7,
      'type': "Indica",
     
  },
  {
      'effects': "Calming",
      'flavor': "Earthy,Citrus",
      'description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      
      'strain': "Electra",
      'rating': 4.7,
      'type': "CBD",
      
  },
  {
      'effects': "Calming",
      'flavor': "Earthy,Citrus",
      'description': "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
      
      'strain': "Cherry Wine",
      'rating': 4.7,
      'type': "CBD",
     
  }
      ]);
    });
};
