CREATE Table employees (
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
	//ra_ID int,
	//s_ID int,
	date Date,
	details varchar(50),

CONSTRAINT PK_appointments PRIMARY KEY (apt_ID),
CONSTRAINT FK_emplyr FOREIGN KEY (b_ID) REFERENCES businesses(b_ID),
CONSTRAINT FK_employee FOREIGN KEY (e_ID) REFERENCES employees(e_ID),
CONSTRAINT FK_cust FOREIGN KEY (c_ID) REFERENCES customers(c_ID),
//CONSTRAINT FK_repeat_app FOREIGN KEY repeat_app(ra_ID)
//CONSTRAINT FK_service FOREIGN KEY services(s_ID)

);



CREATE TABLE clients (
	c_ID int UNIQUE NOT NULL AUTO_INCREMENT,
	b_ID int,
	name char(30),
	address char(50),

	CONSTRAINT PK_clients PRIMARY KEY (c_ID),
	CONSTRAINT FK_employ FOREIGN KEY (b_ID) REFERENCES businesses(b_ID)
);



CREATE TABLE hours (
	h_ID int UNIQUE NOT NULL AUTO_INCREMENT,
	e_ID int,
	data Date,
	num_hours double,

	CONSTRAINT PK_hours PRIMARY KEY (h_ID),
	CONSTRAINT FK_emp FOREIGN KEY (e_ID) REFERENCES employees(e_ID)
);
