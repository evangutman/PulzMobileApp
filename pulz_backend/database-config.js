/*---------
--Author:
--Evan Gutman
---------------
---------------
--Date Started:
--2/1/18
---------------
----------------
--Date Last Modified:
--03/5/18
----------------
----------------
--Version:
--Alpha 1.0
----------------
*/


CREATE TABLE businesses (
	b_ID int UNIQUE NOT NULL AUTO_INCREMENT,
	email char(30),
	password varchar(30),
	bname varchar(40),
	name varchar(40),
	timeJoined timestamp,

	CONSTRAINT PK_businesses PRIMARY KEY (b_ID)
);



CREATE TABLE employees (
	e_ID	int UNIQUE NOT NULL AUTO_INCREMENT,
	b_ID	int,
	name	char(50),

	CONSTRAINT PK_employees PRIMARY KEY (e_ID),
	CONSTRAINT FK_employer FOREIGN KEY (b_ID) REFERENCES businesses(b_ID)
);


CREATE TABLE appointments (
	apt_ID int UNIQUE NOT NULL AUTO_INCREMENT,
	b_ID int,
	e_ID int,
	c_ID int,
	service varchar(20)
	ra_ID int,
	date Date,
	details varchar(50),
	//s_ID int, => used if end up creating custom service table

	CONSTRAINT PK_appointments PRIMARY KEY (apt_ID),
	CONSTRAINT FK_emplyr FOREIGN KEY (b_ID) REFERENCES businesses(b_ID),
	CONSTRAINT FK_employee FOREIGN KEY (e_ID) REFERENCES employees(e_ID),
	CONSTRAINT FK_cust FOREIGN KEY (c_ID) REFERENCES customers(c_ID),
	CONSTRAINT FK_repeatAppointments FOREIGN KEY repeatAppointments(ra_ID)
	//CONSTRAINT FK_service FOREIGN KEY services(s_ID)

);

CREATE TABLE repeatAppointments(
	ra_ID int UNIQUE NOT NULL AUTO_INCREMENT,
	frequency char(30),
	endDate Date,

	CONSTRAINT PK_repeatAppointments PRIMARY KEY (ra_ID)
);


CREATE TABLE clients (
	c_ID int UNIQUE NOT NULL AUTO_INCREMENT,
	b_ID int,
	name char(30),
	address char(50),

	CONSTRAINT PK_clients PRIMARY KEY (c_ID),
	CONSTRAINT FK_employ FOREIGN KEY (b_ID) REFERENCES businesses(b_ID)
);


//hours table used for employees to log number of hours they have worked
CREATE TABLE hours (
	h_ID int UNIQUE NOT NULL AUTO_INCREMENT,
	e_ID int,
	date Date,
	num_hours double,

	CONSTRAINT PK_hours PRIMARY KEY (h_ID),
	CONSTRAINT FK_emp FOREIGN KEY (e_ID) REFERENCES employees(e_ID)
);
