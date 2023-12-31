"""updates  tables with constraints

Revision ID: e3deb31333ef
Revises: d9307027ab3b
Create Date: 2023-10-07 08:25:59.890243

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e3deb31333ef'
down_revision = 'd9307027ab3b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('content', schema=None) as batch_op:
        batch_op.alter_column('thumbnail',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('content', schema=None) as batch_op:
        batch_op.alter_column('thumbnail',
               existing_type=sa.VARCHAR(),
               nullable=False)

    # ### end Alembic commands ###
