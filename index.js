// importer les modules nécessaires
const mongoose = require('mongoose');
require('dotenv').config();
const Person = require('./person');

// connecter à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// fonction pour créer et sauvegarder une personne
const createAndSavePerson = async () => {
  const newPerson = new Person({
    name: 'Mary',
    age: 25,
    favoriteFoods: ['mafé', 'domoda','Burrito']
  });

  try {
    const savedPerson = await newPerson.save();
    console.log('Person saved:', savedPerson);
  } catch (err) {
    console.error(err);
  }
};

// appeler la fonction pour créer et sauvegarder la personne
//createAndSavePerson();

// tableau de personne a créer 
const arrayOfPeople= [
  {name: 'Mansour samb', age : 30, favoriteFoods :['yassa','pizza']},
  {name: 'Joe david', age :25 , favoriteFoods :['cousous','crepe']},
  {name: 'aliou ba', age : 50, favoriteFoods :['sauce poulet','tacos']},
]

// créer les  personnes avec le modele create
const createManyPeople = async ()=>{
try {
  const createdPeople = await Person.create(arrayOfPeople);
  console.log('personne crée',createdPeople);

} catch (error) {
  console.error('erreur lors de la creation de personne', error);
  
}finally{
  mongoose.connection.close();
}
};
//appel de la fonction 
//createManyPeople();

const findPeopleByName = async (name) => {
  try {
    const people = await Person.find({ name }); // Recherche par prénom
    console.log('People found:', people);
  } catch (err) {
    console.error('Error finding people:', err);
  } finally {
    mongoose.connection.close(); // Fermer la connexion après l'opération
  }
};

//findPeopleByName("");
const findPersonByFavoriteFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food }); // Recherche par aliment favori
    if (!person) {
      console.log(`No person found with favorite food: ${food}`);
    } else {
      console.log('Person found:', person);
    }
  } catch (error) {
    console.error('Error finding person:', error);
  } finally {
    mongoose.connection.close(); // Fermer la connexion après l'opération
  }
};

// Appeler la fonction pour rechercher une personne par aliment favori
//findPersonByFavoriteFood('Pizza');

// Fonction pour rechercher une personne par _id
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    if (!person) {
      console.log(`No person found with id: ${personId}`);
    } else {
      console.log('Person found:', person);
    }
  } catch (error) {
    console.error('Error finding person:', error);
  } finally {
    mongoose.connection.close(); // Fermer la connexion après l'opération
  }
};

// Appeler la fonction pour rechercher une personne par _id
//findPersonById('66815a28549e2489d9f39299');

 // Fonction pour mettre à jour une personne par _id
 const updatePersonById = async (personId) => {
  try {
    // Recherche de la personne par _id
    const person = await Person.findById(personId);
    if (!person) {
      console.log(`No person found with id: ${personId}`);
      return;
    }

    // Ajout de "hamburger" à la liste des favoriteFoods
    person.favoriteFoods.push('hamburger');

    // Sauvegarde de la personne mise à jour
    await person.save();
    console.log('Person updated successfully:', person);
  } catch (error) {
    console.error('Error updating person:', error);
  } finally {
    mongoose.connection.close(); // Fermer la connexion après l'opération
  }
};

// Appeler la fonction pour mettre à jour une personne par _id
//updatePersonById('66815a28549e2489d9f39299'); 


const updatePersonByName = async (personName)=>{
 try {
  const updatedperson = await Person.findOneAndUpdate(
   {name: personName},
   {age: 50},
   {new : true}
);
if (!updatedperson){
  console.log(`nous n'avons pas trouvé la personne : ${personName} `);
  return;
}
console.log("personne mise a jour avec success", updatedperson);
  
 } catch (error) {
  console.error("erreur lor de la mise a jour", error);
  
 }finally{
mongoose.connection.close();
 }
};
//updatePersonByName ('Mansour samb');
const removePersonById = async (personId) => {
  try {
    // Utilisation de findByIdAndRemove pour trouver et supprimer la personne par _id
    const removedPerson = await Person.findByIdAndDelete(personId);

    if (!removedPerson) {
      console.log(`No person found with id: ${personId}`);
      return;
    }

    console.log('Person removed successfully:', removedPerson);
  } catch (error) {
    console.error('Error removing person:', error);
  } finally {
    mongoose.connection.close(); // Fermer la connexion après l'opération
  }
};

// Appeler la fonction pour supprimer une personne par _id
//removePersonById('66815a28549e2489d9f39299'); 



const deletePersonsNamedMary = async () => {
  try {
    const result = await Person.deleteMany({ name: 'Mary' });
    console.log(`${result.deletedCount} documents supprimés.`);
    // `result` contient un objet avec `deletedCount` indiquant le nombre de documents supprimés
    // Faites quelque chose avec `result` si nécessaire
  } catch (err) {
    console.error(err);
    // Gérer l'erreur ici si nécessaire
  }
};

// Appeler la fonction pour supprimer les personnes nommées "Mary"
//deletePersonsNamedMary();

const searchBurritoLovers = async () => {
  try {
    const data = await Person.find({ favoriteFoods: 'Burrito' })
                              .sort({ name: 1 })
                              .limit(2)
                              .select({ age: 0 });
    console.log('Found Burrito Lovers:');
    console.log(data); // Affiche les résultats
  } catch (err) {
    console.error('Error:', err); // Gestion des erreurs
  } finally {
    await mongoose.disconnect(); // Déconnexion de la base de données après utilisation
  }
};

// Appel de la fonction de recherche principale
searchBurritoLovers();




  