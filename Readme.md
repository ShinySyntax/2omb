<h1> PDA Token Management Program </h1>

This Rust program is designed to demonstrate the creation and management of a Program Derived Address (PDA) on the Solana blockchain. It includes basic functionality to manage token accounts associated with a PDA.
Prerequisites

Before you begin, make sure you have the following installed:

    Rust programming environment
    Solana CLI and tools

You can find installation instructions for Rust here and for Solana here.
Installation

Clone the repository and navigate to the project directory:

    git clone https://github.com/yourusername/pda_token_management.git
    cd pda_token_management

<h2>Building the Project</h2>

To build the project, run the following command in the root of the project directory:

bash

cargo build

Running the Program

To deploy this program to the Solana devnet, you must first ensure you have a funded Solana wallet. Follow these steps:

    Set Solana CLI config to devnet:

    solana config set --url devnet

<h2>Deploy the program:</h2>

    solana program deploy target/deploy/pda_token_management.so

This will output a program ID which you will use to interact with the program.
Testing the Program

To run the included tests, execute:

    cargo test

This will run the tests defined in the tests/ directory, ensuring that the program logic functions as expected.
Interacting with the Program

You can interact with the program using the Solana CLI or by writing client scripts. For a basic example of sending a transaction to your program:

    solana call <PROGRAM_ID> <INPUT_DATA> --accounts <ACCOUNTS>

Replace <PROGRAM_ID>, <INPUT_DATA>, and <ACCOUNTS> with your actual program ID, the input data for your instruction, and the public keys of the involved accounts, respectively.
Contributing

Contributions to this project are welcome! Please fork the repository and submit a pull request with your proposed changes.
License

This project is licensed under the MIT License - see the LICENSE.md file for details.
Support

For support, open an issue on the GitHub project page.