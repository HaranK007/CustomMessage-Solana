use anchor_lang::prelude::*;

declare_id!("HGUDvDr2Ya4hhHr45NZULdgq2EKBwCD6FyEuYh4EacsM");

#[program]
pub mod custom_message {
    use super::*;

    pub fn custom_message(ctx: Context<CustomMessage>, content: String) -> Result<()> {
        let message = &mut ctx.accounts.message;
        message.content = content.clone();

        msg!("{}",message.content);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CustomMessage<'info> {
    #[account(init, payer = user, space = 256)]
    pub message: Account<'info, Message>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Message{
    pub content: String,
}