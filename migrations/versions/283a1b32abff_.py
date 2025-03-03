"""empty message

Revision ID: 283a1b32abff
Revises: 36b7ba26eb24
Create Date: 2025-03-03 19:17:05.518832

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '283a1b32abff'
down_revision = '36b7ba26eb24'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tasks')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tasks',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('description', sa.VARCHAR(length=255), autoincrement=False, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='tasks_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='tasks_pkey')
    )
    # ### end Alembic commands ###
