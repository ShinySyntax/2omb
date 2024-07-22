use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    program_error::ProgramError,
    sysvar::{rent::Rent, Sysvar},
};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct TokenTransferInstruction {
    pub amount: u64,
}

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let account_info_iter = &mut accounts.iter();
    let initializer_account = next_account_info(account_info_iter)?;
    let pda_account = next_account_info(account_info_iter)?;
    let system_program_account = next_account_info(account_info_iter)?;

    let instruction = TokenTransferInstruction::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    let (pda, _nonce) = Pubkey::find_program_address(&[b"PDA SEED"], program_id);

    if pda_account.key != &pda {
        return Err(ProgramError::IllegalOwner);
    }

    let rent = Rent::get()?;
    if **pda_account.lamports.borrow() < rent.minimum_balance(pda_account.data_len()) {
        let required_lamports = rent.minimum_balance(pda_account.data_len()) - **pda_account.lamports.borrow();
        **pda_account.lamports.borrow_mut() += required_lamports;
        **initializer_account.lamports.borrow_mut() -= required_lamports;
    }

    Ok(())
}
