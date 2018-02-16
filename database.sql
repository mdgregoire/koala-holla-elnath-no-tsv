create table koala(
	id serial primary key,
	name varchar(20),
	age integer,
	gender varchar (2),
	ready_for_transfer varchar (3),
	notes varchar (140)
					 );

INSERT into koala (name, age, gender, ready_for_transfer, notes)
VALUES ('Scotty', 4, 'M', 'Yes', 'Born in Guatemala');

INSERT into koala (name, age, gender, ready_for_transfer, notes)
VALUES ('Jean', 5, 'F', 'Yes', 'Allergic to lots of lava');

INSERT into koala (name, age, gender, ready_for_transfer, notes)
VALUES ('Ororo', 7, 'F', 'No', 'Loves listening to Paula (Abdul)');

INSERT into koala (name, age, gender, ready_for_transfer, notes)
VALUES ('Logan', 15, 'M', 'No', 'Loves the sauna');

INSERT into koala (name, age, gender, ready_for_transfer, notes)
VALUES ('Charile', 9, 'M', 'Yes', 'Favorite band is Nirvana');

INSERT into koala (name, age, gender, ready_for_transfer, notes)
VALUES ('Betsy', 4, 'F', 'Yes', 'Has a pet iguana');
