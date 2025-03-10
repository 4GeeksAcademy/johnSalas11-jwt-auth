"""empty message

Revision ID: 294422d5f449
Revises: 55107a51d711
Create Date: 2025-03-03 13:52:35.068661

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '294422d5f449'
down_revision = '55107a51d711'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(length=120), nullable=False))
        batch_op.create_unique_constraint(None, ['username'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('username')

    # ### end Alembic commands ###
