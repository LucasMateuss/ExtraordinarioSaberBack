CREATE TABLE Categoria(
    id_categoria INT PRIMARY KEY UNIQUE AUTO_INCREMENT,
    nome_categoria VARCHAR(150) NOT NULL
);

CREATE TABLE Produto(
    cod_produto INT PRIMARY KEY UNIQUE AUTO_INCREMENT,
    nome_produto VARCHAR(150) NOT NULL,
    qtde_produto INT NOT NULL,
    id_categoria INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria)
);

CREATE TABLE Pedido(
    num_pedido INT PRIMARY KEY UNIQUE AUTO_INCREMENT,
    cod_produto INT NOT NULL,
    qtde_pedido INT,
    FOREIGN KEY (cod_produto) REFERENCES Produto(cod_produto)
);


CREATE TABLE Usuario(
    id_Usuario INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL unique,
    senha VARCHAR(100) NOT NULL,
    Administrador BIT NOT NULL
);


