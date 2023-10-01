"""adds creator column to content table

Revision ID: 7b8547f87709
Revises: a6324148fdbc
Create Date: 2023-10-01 11:12:23.125090

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7b8547f87709'
down_revision = 'a6324148fdbc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('content', schema=None) as batch_op:
        batch_op.add_column(sa.Column('creator', sa.String(), server_default='Unknown', nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('content', schema=None) as batch_op:
        batch_op.drop_column('creator')

    # ### end Alembic commands ###