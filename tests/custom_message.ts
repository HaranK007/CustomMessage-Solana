import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CustomMessage } from "../target/types/custom_message";
import * as assert from "assert";


describe("custom_message", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.CustomMessage as Program<CustomMessage>;

  it("Is initialized!", async () => {
    const message = anchor.web3.Keypair.generate();
    await program.methods.customMessage("Hello Solana")
    .accounts({
      message: message.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([message])
    .rpc()

    const messageAccount = await program.account.message.fetch(message.publicKey);

    assert.equal(messageAccount.content,"Hello Solana");
    console.log(messageAccount.content.toString());

  });

});
