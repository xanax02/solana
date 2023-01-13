use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
};

entrypoint!(process_instruction);

pub fn process_instruction(programId: &Pubkey, accounts: &[AccountInfo], instruction_data: &[u8]) -> ProgramResult
{
    msg!("hello world");
    Ok(())
}