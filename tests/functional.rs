#[cfg(test)]
mod tests {
    use super::*;
    use solana_program::clock::Epoch;
    use solana_program_test::*;
    use solana_sdk::{
        account::Account,
        signature::{Keypair, Signer},
        transaction::Transaction,
    };

    #[tokio::test]
    async fn test_pda_creation_and_funding() {
        let program_id = Pubkey::new_unique();
        let mut program_test = ProgramTest::new(
            "pda_token_management",
            program_id,
            processor!(process_instruction),
        );

        let (pda, nonce) = Pubkey::find_program_address(&[b"PDA SEED"], &program_id);
        program_test.add_account(
            pda,
            Account {
                lamports: 100,
                data: vec![0; 1024],
                owner: program_id,
                executable: false,
                rent_epoch: Epoch::default(),
            },
        );

        let (mut banks_client, payer, recent_blockhash) = program_test.start().await;

        let mut transaction = Transaction::new_with_payer(
            &[instruction],
            Some(&payer.pubkey()),
        );

        transaction.sign(&[&payer], recent_blockhash);
        banks_client.process_transaction(transaction).await.unwrap();
    }
}
